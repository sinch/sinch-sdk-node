import * as dotenv from 'dotenv';
import { SinchClient, Voice } from '@sinch/sdk-core';

async function main() {
  dotenv.config();

  const projectId = process.env.SINCH_PROJECT_ID || 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID || 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET || 'MY_KEY_SECRET';
  const sinchNumber = process.env.SINCH_NUMBER || 'MY_SINCH_NUMBER';
  const destinationNumber = process.env.DESTINATION_NUMBER || 'MY_DESTINATION_NUMBER';

  const sinchClient = new SinchClient({
    projectId,
    keyId,
    keySecret,
  });

  const { Calls, CommandsSequenceCreator, Destination } = Voice.v2;

  // SVAML commands: dial -> on answer play audio file then TTS -> hangup
  const commands = new CommandsSequenceCreator()
    .dial((dial) => {
      dial
        .to(Destination.phone(destinationNumber))
        .from(Destination.phone(sinchNumber))
        .name('audio-notification')
        .timeoutDurationSeconds(30)
        .maxDurationSeconds(300)
        .onAnswer((seq) => {
          seq.messages((messages) => {
            messages
              .name('notification')
              .onFinish(Calls.hangup())
              .play('https://samplelib.com/mp3/sample-12s.mp3')
              .text(
                'Hello! This is a test notification from Sinch. Your verification code is 4 8 3 7.',
                'Emma',
              );
          });
        });
    })
    .build();

  console.log(`Placing callout from ${sinchNumber} to ${destinationNumber} ...`);

  const response = await sinchClient.voice.v2.calls.start({
    createCallRequestBody: { commands },
  });

  console.log('Call created successfully:');
  console.log(response);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
