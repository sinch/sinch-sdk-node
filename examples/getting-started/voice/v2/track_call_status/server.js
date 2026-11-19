import * as dotenv from 'dotenv';
import express from 'express';
import { Voice, VoiceV2CallbackWebhooks } from '@sinch/sdk-core';

dotenv.config();

const port = Number(process.env.PORT || '3000');

const { Calls, CommandsSequenceCreator } = Voice.v2;
const callbackWebhooks = new VoiceV2CallbackWebhooks();

const app = express();
app.use(express.json());

app.post('/voice/events', (req, res) => {
  const ce = {
    type: req.headers['ce-type'],
    source: req.headers['ce-source'],
    id: req.headers['ce-id'],
    time: req.headers['ce-time'],
    specversion: req.headers['ce-specversion'],
  };
  const event = callbackWebhooks.parseEvent(req.body);

  console.log(`ce=${JSON.stringify(ce)}`);
  console.log(`event=${event.event}`);
  console.log(`call=${JSON.stringify(event.call)}`);

  let response;
  if (event.event === 'call.incoming') {
    // Return the call flow directly; onHangup is honored here
    response = VoiceV2CallbackWebhooks.incomingCallResponse({
      commands: new CommandsSequenceCreator()
        .answer()
        .text('Thank you for calling. Goodbye.', 'Emma', {
          onFinish: Calls.hangup(),
        })
        .build(),
      onHangup: Calls.hangup(),
    });
  } else {
    response = VoiceV2CallbackWebhooks.response({ commands: [] });
  }

  res
    .status(200)
    .type('application/json')
    .send(callbackWebhooks.serializeResponse(response));
});

app.listen(port, () => {
  console.log(`Webhook receiver on :${port}`);
  console.log(
    'Point callBehavior.webhook.url -> https://<your-ngrok>/voice/events',
  );
});
