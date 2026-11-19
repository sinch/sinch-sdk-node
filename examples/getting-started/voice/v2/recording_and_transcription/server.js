import * as dotenv from 'dotenv';
import express from 'express';
import { Voice, VoiceV2CallbackWebhooks } from '@sinch/sdk-core';

dotenv.config();

const storageDestinationUrl
  = process.env.STORAGE_DESTINATION_URL || 'MY_STORAGE_DESTINATION_URL';
const storageCredentials
  = process.env.STORAGE_CREDENTIALS || 'MY_STORAGE_CREDENTIALS';
const port = Number(process.env.PORT || '8081');

/** @type {'AWS' | 'GCP' | 'AZURE'} */
let storageDestination;
if (storageDestinationUrl.startsWith('gs://')) {
  storageDestination = 'GCP';
} else if (storageDestinationUrl.startsWith('s3://')) {
  storageDestination = 'AWS';
} else {
  storageDestination = 'AZURE';
}

const { Calls, CommandsSequenceCreator } = Voice.v2;
const callbackWebhooks = new VoiceV2CallbackWebhooks();

const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
  const event = callbackWebhooks.parseEvent(req.body);

  console.log(`Received event: ${event.event}, callId: ${event.call.callId}`);

  let response;
  if (event.event === 'call.incoming') {
    // SVAML commands: answer -> start recording -> play a recording notice
    response = VoiceV2CallbackWebhooks.incomingCallResponse({
      commands: new CommandsSequenceCreator()
        .answer()
        .recording((recording) => {
          recording
            .name('main-recording')
            .options({
              destination: storageDestination,
              url: storageDestinationUrl,
              credentials: storageCredentials,
              format: 'MP3',
              recordingType: 'COMBINED',
              transcriptionOptions: { isEnabled: true, locale: 'en-US' },
            });
        })
        .text(
          'This call may be recorded for quality and compliance purposes.',
          'Emma',
          { name: 'recording-notice' },
        )
        .build(),
      // Add further SVAML commands here, e.g.:
      // .bridgeCall('agent-bridge')
      onHangup: Calls.hangup(),
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
  console.log(`Recording webhook server listening on port ${port}`);
  console.log(`Storage: ${storageDestination} -> ${storageDestinationUrl}`);
  console.log(`(Use ngrok: ngrok http ${port})`);
});
