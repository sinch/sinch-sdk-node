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

  // The new HMAC secret to configure for the callback
  const hmacSecret = 'NEW_HMAC_SECRET';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try{
    const response = await sinch.numbers.callbacks.update({
      updateCallbackConfigurationRequestBody: {
        hmacSecret,
      },
    });
    console.log('✅ Successfully updated the callback configuration.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error('❌ Failed to update the callback configuration:');
    console.error(err);
  }
}

main();
