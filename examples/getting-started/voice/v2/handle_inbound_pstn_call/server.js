import * as dotenv from 'dotenv';
import express from 'express';
import { Voice, VoiceV2CallbackWebhooks } from '@sinch/sdk-core';

dotenv.config();

const sinchNumber = process.env.SINCH_NUMBER || 'MY_SINCH_NUMBER';
const destinationNumber = process.env.DESTINATION_NUMBER || 'MY_DESTINATION_NUMBER';
const port = Number(process.env.PORT || '3000');

const { Calls, CommandsSequenceCreator, Destination } = Voice.v2;
const callbackWebhooks = new VoiceV2CallbackWebhooks();

const app = express();
app.use(express.json());

app.post('/voice/events', (req, res) => {
  const event = callbackWebhooks.parseEvent(req.body);

  console.log(`event=${event.event} sessionId=${event.call.sessionId}`);

  let response;
  if (event.event === 'call.incoming') {
    // SVAML commands: answer -> greet -> bridge with the agent leg dialed below
    response = VoiceV2CallbackWebhooks.incomingCallResponse({
      commands: new CommandsSequenceCreator()
        .answer()
        .text(
          'Welcome to Acme. Please hold while we connect your call.',
          'Emma',
          { name: 'greeting' },
        )
        .bridgeCall('inbound-bridge')
        .dial((dial) => {
          dial
            .to(Destination.phone(destinationNumber))
            .from(Destination.phone(sinchNumber))
            .name('agent')
            .timeoutDurationSeconds(30)
            .onAnswer(Calls.bridgeCall('inbound-bridge'))
            .onHangup(Calls.hangup({ name: 'incoming' }))
            .onTimeout(Calls.hangup({ name: 'incoming' }));
        })
        .build(),
      name: 'incoming',
      onHangup: Calls.hangup({ name: 'agent' }),
    });
  } else {
    // For all other events, acknowledge with no commands
    response = VoiceV2CallbackWebhooks.response({ commands: [] });
  }

  res
    .status(200)
    .type('application/json')
    .send(callbackWebhooks.serializeResponse(response));
});

app.listen(port, () => {
  console.log(`Inbound PSTN webhook server on :${port}`);
});
