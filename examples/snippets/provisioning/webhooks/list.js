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
    const webhooks = [];
    for await (const webhook of sinch.provisioning.webhooks.list()) {
      webhooks.push(webhook);
    }
    if (!webhooks.length) {
      console.log('No Provisioning webhooks found for this project.');
      return;
    }
    console.log(`✅ Found ${webhooks.length} Provisioning webhooks.`);
    webhooks.forEach((webhook) => {
      console.log(webhook);
    });
  } catch (err) {
    console.error('❌ Failed to list Provisioning webhooks:');
    console.error(err);
  }
}

main();
