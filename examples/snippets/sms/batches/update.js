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
  const smsRegion = process.env.SINCH_SMS_REGION ?? 'MY_SMS_REGION';

  // The ID of the batch to update
  const batchId = 'BATCH_ID';
  // The phone numbers to add and remove from the batch
  const toAdd = ['+123456789', '+987654321'];
  const toRemove = ['+11111111111', '+29999999999'];

  const sinch = new SinchClient({ projectId, keyId, keySecret, smsRegion });

  try {
    const response = await sinch.sms.batches.update({
      batch_id: batchId,
      updateBatchMessageRequestBody: {
        to_add: toAdd,
        to_remove: toRemove,
      },
    });
    console.log('✅ Successfully updated the SMS batch.');
    console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
  } catch (err) {
    console.error(`❌ Failed to update the SMS batch with ID ${batchId}:`);
    console.error(err);
  }
}

main();
