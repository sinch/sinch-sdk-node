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

  // The phone number to update
  const phoneNumber = process.env.SINCH_PHONE_NUMBER ?? 'MY_SINCH_PHONE_NUMBER';
  const updatedDisplayName = 'Updated name with Sinch Node.js SDK';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.numbers.update({
      phoneNumber,
      updateActiveNumberRequestBody: {
        displayName: updatedDisplayName,
      },
    });
    console.log('✅ Successfully updated the phone number.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to update the phone number ${phoneNumber}:`);
    console.error(err);
  }
}

main();
