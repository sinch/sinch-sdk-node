/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const projectId = process.env.SINCH_PROJECT_ID ?? 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID ?? 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET ?? 'MY_KEY_SECRET';

  // Replace with a valid 'from' number in your call history
  const fromFilter = '+1781';
  // Replace with one of: 'COMPLETED', 'NO_ANSWER', 'CANCEL', 'BUSY', 'FAILED'
  const callResultFilter = 'FAILED';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.elasticSipTrunking.calls.find({
      from: fromFilter,
      callResult: callResultFilter,
    });
    if (response.data.length === 0) {
      console.log('No calls found matching your criteria.');
      return;
    }
    console.log(`✅ Found ${response.data.length} calls.`);
    response.data.forEach((call) => {
      console.log(call);
    });
  } catch (err) {
    console.error('❌ Failed to find calls:');
    console.error(err);
  }
}

main();
