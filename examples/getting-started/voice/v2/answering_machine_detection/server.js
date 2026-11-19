import * as dotenv from 'dotenv';
import express from 'express';
import { Voice, VoiceV2CallbackWebhooks } from '@sinch/sdk-core';

dotenv.config();

const port = Number(process.env.PORT || '3000');

const { Calls, CommandsSequenceCreator } = Voice.v2;
const callbackWebhooks = new VoiceV2CallbackWebhooks();

const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
  const event = callbackWebhooks.parseEvent(req.body);

  console.log(`Received event: ${event.event}, callId: ${event.call.callId}`);

  let response;
  if (event.event === 'call.incoming') {
    // Inbound call: answer and run AMD as the first command after answering.
    // AMD fires one of: onHuman, onMachine, onBeep, onUnknown.
    response = VoiceV2CallbackWebhooks.response({
      commands: new CommandsSequenceCreator()
        .answer()
        .amd((amd) => {
          amd
            // Live human: play a personalized greeting
            .onHuman((seq) => {
              seq.text(
                'Hello! This is a call from Acme Corp. An agent will be with you shortly.',
                'Emma',
                {
                  name: 'human-greeting',
                  onFinish: Calls.hangup(),
                },
              );
            })
            // Machine greeting (no beep yet): hang up silently
            .onMachine(Calls.hangup())
            // Beep detected: leave voicemail right after the beep
            .onBeep((seq) => {
              seq.text(
                'Hi, this is Acme Corp calling about your recent inquiry. Please call us back at 555-1234. Thank you.',
                'Emma',
                {
                  name: 'voicemail-message',
                  onFinish: Calls.hangup(),
                },
              );
            })
            // Unknown result: hang up safely
            .onUnknown(Calls.hangup());
        })
        .build(),
    });
  } else if (event.event.startsWith('call.amd.')) {
    // AMD verdict events: this is how you see which branch fired, server-side
    console.log(`AMD verdict: ${event.event}`);
    response = VoiceV2CallbackWebhooks.response({ commands: [] });
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
  console.log(`AMD callback server listening on port ${port}`);
  console.log(`Set your Sinch service webhook URL to: http://localhost:${port}/webhook`);
  console.log(`(Use ngrok: ngrok http ${port})`);
});
