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

app.post('/webhook', (req, res) => {
  const event = callbackWebhooks.parseEvent(req.body);

  console.log(`Received webhook event: ${event.event}`);
  console.log(event.call);

  let response;
  if (event.event === 'call.incoming') {
    // "name" names the inbound (caller) leg and "onHangup" handles
    // the caller hanging up
    response = VoiceV2CallbackWebhooks.incomingCallResponse({
      commands: new CommandsSequenceCreator()
        .answer()
        .text('Please hold while we connect your call.', 'Emma', {
          name: 'greeting',
        })
        // Add Party A to a named bridge
        .bridgeCall('main-bridge')
        .dial((dial) => {
          dial
            // In production, look up the destination from your DB (event.call.to)
            .to(Destination.phone(destinationNumber))
            // Party B sees the Sinch number
            .from(Destination.phone(sinchNumber))
            .name('callee')
            .timeoutDurationSeconds(30)
            .onAnswer(Calls.bridgeCall('main-bridge'))
            .onHangup(Calls.hangup({ name: 'caller' }));
        })
        .build(),
      name: 'caller',
      onHangup: Calls.hangup({ name: 'callee' }),
    });
  } else {
    console.log(`Unhandled event: ${event.event}`);
    response = VoiceV2CallbackWebhooks.response({ commands: [] });
  }

  res
    .status(200)
    .type('application/json')
    .send(callbackWebhooks.serializeResponse(response));
});

app.listen(port, () => {
  console.log(`Number masking webhook server listening on port ${port}`);
});
