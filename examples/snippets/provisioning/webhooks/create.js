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

  // The URL called by Sinch when sending event
  const webhookTarget = 'https://my.callback.url/provisioning';
  // The secret to be used to validate event
  const webhookSecret = 'NEW_WEBHOOK_SECRET';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.provisioning.webhooks.create({
      webhookCreateRequestBody: {
        target: webhookTarget,
        secret: webhookSecret,
        triggers: ['ALL'],
      },
    });
    console.log('✅ Successfully created the Provisioning webhook.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error('❌ Failed to create the Provisioning webhook:');
    console.error(err);
  }
}

main();
