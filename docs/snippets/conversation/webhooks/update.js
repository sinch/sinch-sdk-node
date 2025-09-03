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
  const conversationRegion = process.env.SINCH_CONVERSATION_REGION ?? 'MY_CONVERSATION_REGION';

  // The ID of the Webhook to update
  const webhookId = 'WEBHOOK_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    const response = await sinch.conversation.webhooks.update({
      webhook_id: webhookId,
      webhookUpdateRequestBody: {
        target: 'https://foo.com/webhook_updated',
        triggers: ['MESSAGE_SUBMIT', 'MESSAGE_DELIVERY'],
        target_type: 'HTTP',
      },
    });
    console.log('✅ Successfully updated the Webhook.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to update the Webhook with ID ${webhookId}:`);
    console.error(err);
  }
}

main();
