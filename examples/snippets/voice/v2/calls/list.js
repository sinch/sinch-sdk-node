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

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.voice.v2.calls.list();
    if (response.data.length === 0) {
      console.log('No Voice v2 calls found.');
      return;
    }
    console.log(`✅ Found ${response.data.length} Voice v2 calls.`);
    response.data.forEach((call) => {
      console.log(call);
    });
  } catch (err) {
    console.error('❌ Failed to list Voice v2 calls:');
    console.error(err);
  }
}

main();
