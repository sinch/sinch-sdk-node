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

  // SVAML commands to validate: the masking flow server.js returns on call.incoming
  const commands = new CommandsSequenceCreator()
    .answer()
    .text('Please hold while we connect your call.', 'Emma', { name: 'greeting' })
    .bridgeCall('main-bridge')
    .dial((dial) => {
      dial
        .to(Destination.phone(destinationNumber))
        .from(Destination.phone(sinchNumber))
        .name('callee')
        .timeoutDurationSeconds(30)
        .onAnswer(Calls.bridgeCall('main-bridge'))
        .onHangup(Calls.hangup({ name: 'caller' }));
    })
    .build();

  const response = await sinchClient.voice.v2.svaml.validate({
    validateSvamlRequestBody: {
      svaml: {
        commands,
        callName: 'caller',
        events: {
          onHangup: [Calls.hangup({ name: 'callee' })],
        },
      },
      validationType: 'STRICT',
    },
  });

  console.log(response);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
