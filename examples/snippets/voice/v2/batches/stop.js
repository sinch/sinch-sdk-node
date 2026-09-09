/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const projectId = process.env.SINCH_PROJECT_ID ?? 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID ?? 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET ?? 'MY_KEY_SECRET';

  // The ID of the batch to stop processing
  const batchId = 'BATCH_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    await sinch.voice.v2.batches.stop({
      batchId,
    });
    console.log(`✅ Successfully requested stop for the batch call with ID ${batchId}.`);
  } catch (err) {
    console.error(`❌ Failed to stop the batch call with ID ${batchId}:`);
    console.error(err);
  }
}

main();
