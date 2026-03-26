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
  const conversationRegion = process.env.SINCH_CONVERSATION_REGION ?? 'MY_CONVERSATION_REGION';

  // The ID of the Conversation App to list Webhooks for
  const appId = 'CONVERSATION_APP_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    const response = await sinch.conversation.webhooks.list({
      app_id: appId,
    });
    if (!response.webhooks?.length) {
      console.log(`No Webhooks found for the Conversation App with ID ${appId}.`);
      return;
    }
    console.log(`✅ Found ${response.webhooks.length} Webhooks.`);
    response.webhooks.forEach((webhook) => {
      console.log(webhook);
    });
  } catch (err) {
    console.error(`❌ Failed to list the Webhooks for the Conversation App with ID ${appId}:`);
    console.error(err);
  }
}

main();
