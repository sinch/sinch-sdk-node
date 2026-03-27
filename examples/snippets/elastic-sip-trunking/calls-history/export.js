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

  // Replace with a valid 'from' number in your call history
  const fromFilter = '+1440';
  // Replace with one of: 'COMPLETED', 'NO_ANSWER', 'CANCEL', 'BUSY', 'FAILED'
  const callResultFilter = 'FAILED';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.elasticSipTrunking.calls.export({
      from: fromFilter,
      callResult: callResultFilter,
    });
    console.log('✅ Successfully exported the call records.');
    console.log(response);
  } catch (err) {
    console.error('❌ Failed to export the call records:');
    console.error(err);
  }
}

main();
