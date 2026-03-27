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
    const response = await sinch.elasticSipTrunking.sipTrunks.list({});
    if (response.data.length === 0) {
      console.log('No SIP Trunks found.');
      return;
    }
    console.log(`✅ Found ${response.data.length} SIP Trunks.`);
    response.data.forEach((trunk) => {
      console.log(trunk);
    });
  } catch (err) {
    console.error('❌ Failed to list the SIP Trunks:');
    console.error(err);
  }
}

main();
