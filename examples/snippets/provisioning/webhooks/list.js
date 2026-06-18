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
    const response = await sinch.provisioning.webhooks.list({
      pageSize: 15,
    });
    if (!response.webhooks?.length) {
      console.log('No Provisioning webhooks found for this project.');
      return;
    }
    console.log(`✅ Found ${response.webhooks.length} Provisioning webhooks.`);
    response.webhooks.forEach((webhook) => {
      console.log(webhook);
    });
  } catch (err) {
    console.error('❌ Failed to list Provisioning webhooks:');
    console.error(err);
  }
}

main();
