import * as dotenv from 'dotenv';
import { SinchClient, Voice } from '@sinch/sdk-core';

async function main() {
  dotenv.config();

  const projectId = process.env.SINCH_PROJECT_ID || 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID || 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET || 'MY_KEY_SECRET';

  const sinchClient = new SinchClient({
    projectId,
    keyId,
    keySecret,
  });

  const { CommandsSequenceCreator } = Voice.v2;

  // SVAML commands to validate: answer -> greet
  const commands = new CommandsSequenceCreator()
    .answer()
    .text('Welcome to Acme.', 'Emma')
    .build();

  const response = await sinchClient.voice.v2.svaml.validate({
    validateSvamlRequestBody: {
      svaml: { commands },
    },
  });

  console.log(response);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
