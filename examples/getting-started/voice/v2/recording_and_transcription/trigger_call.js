import * as dotenv from 'dotenv';
import { SinchClient, Voice } from '@sinch/sdk-core';

async function main() {
  dotenv.config();

  const projectId = process.env.SINCH_PROJECT_ID || 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID || 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET || 'MY_KEY_SECRET';
  const sinchNumber = process.env.SINCH_NUMBER || 'MY_SINCH_NUMBER';
  const destinationNumber = process.env.DESTINATION_NUMBER || 'MY_DESTINATION_NUMBER';
  const storageDestinationUrl
    = process.env.STORAGE_DESTINATION_URL || 'MY_STORAGE_DESTINATION_URL';
  const storageCredentials
    = process.env.STORAGE_CREDENTIALS || 'MY_STORAGE_CREDENTIALS';

  // Infer the storage provider from the destination URL scheme
  /** @type {'AWS' | 'GCP' | 'AZURE'} */
  let storageDestination;
  if (storageDestinationUrl.startsWith('s3://')) {
    storageDestination = 'AWS';
  } else if (storageDestinationUrl.startsWith('gs://')) {
    storageDestination = 'GCP';
  } else {
    storageDestination = 'AZURE';
  }

  const sinchClient = new SinchClient({
    projectId,
    keyId,
    keySecret,
  });

  const { CommandsSequenceCreator, Destination } = Voice.v2;

  // SVAML commands: dial -> on answer start recording and play a recording notice
  // -> on hangup stop recording, which uploads the file to the storage bucket
  const commands = new CommandsSequenceCreator()
    .dial((dial) => {
      dial
        .to(Destination.phone(destinationNumber))
        .from(Destination.phone(sinchNumber))
        .name('recorded-call')
        .timeoutDurationSeconds(30)
        .maxDurationSeconds(3600)
        .onAnswer((seq) => {
          seq
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
            .text('This call is being recorded.', 'Emma', {
              name: 'recording-notice',
            });
        })
        .onHangup((seq) => {
          seq.stopRecording('main-recording');
        });
    })
    .build();

  console.log(
    `Calling ${destinationNumber} with recording enabled (${storageDestination}) ...`,
  );

  const response = await sinchClient.voice.v2.calls.start({
    createCallRequestBody: { commands },
  });

  console.log('Call created with recording:');
  console.log(response);
  console.log(`Recording will be uploaded to: ${storageDestinationUrl}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
