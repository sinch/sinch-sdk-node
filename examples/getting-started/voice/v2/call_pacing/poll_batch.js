import * as dotenv from 'dotenv';
import { SinchClient } from '@sinch/sdk-core';

async function main() {
  dotenv.config();

  const projectId = process.env.SINCH_PROJECT_ID || 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID || 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET || 'MY_KEY_SECRET';
  const batchId = process.env.BATCH_ID || 'MY_BATCH_ID';

  const sinchClient = new SinchClient({
    projectId,
    keyId,
    keySecret,
  });

  // Poll the batch summary every 5s until all call sessions reach a final state
  while (true) {
    const response = await sinchClient.voice.v2.batches.get({ batchId });

    console.log(response);

    if (response.queued === 0 && response.inProgress === 0) {
      console.log('All call sessions finished.');
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
