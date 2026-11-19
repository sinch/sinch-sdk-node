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

  const { Amd, Calls, CommandsSequenceCreator, Destination } = Voice.v2;

  // The `amd` command must be placed in the `onAnswer` event of a `dial` command.
  // It fires different SVAML commands based on what AMD detects.
  const commands = new CommandsSequenceCreator()
    .dial((dial) => {
      dial
        .to(Destination.phone(destinationNumber))
        .from(Destination.phone(sinchNumber))
        .name('amd-call')
        .timeoutDurationSeconds(45)
        .maxDurationSeconds(300)
        .onAnswer(
          Amd.activate({
            // Human picked up: play a personalized greeting
            onHuman: (seq) => {
              seq.text(
                'Hello! This is a call from Acme Corp. An agent will be with you shortly.',
                'Emma',
                {
                  name: 'human-greeting',
                  onFinish: Calls.hangup(),
                },
              );
            },
            // Machine greeting detected (beep not yet heard): just hang up
            onMachine: Calls.hangup(),
            // Beep detected: leave a voicemail message right now
            onBeep: (seq) => {
              seq.text(
                'Hi, this is Acme Corp calling about your recent inquiry. Please call us back at 555-1234. Thank you.',
                'Emma',
                {
                  name: 'voicemail-message',
                  onFinish: Calls.hangup(),
                },
              );
            },
            // Unknown: hang up safely
            onUnknown: Calls.hangup(),
          }),
        );
    })
    .build();

  console.log(`Placing AMD callout from ${sinchNumber} to ${destinationNumber} ...`);

  const response = await sinchClient.voice.v2.calls.start({
    createCallRequestBody: { commands },
  });

  console.log('AMD call created successfully:');
  console.log(response);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
