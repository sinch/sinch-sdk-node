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

  // The ID of the Conversation App to list Recent Conversations from
  const appId = 'CONVERSATION_APP_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    const response = await sinch.conversation.conversation.listRecent({
      app_id: appId,
      only_active: true,
    });
    if (response.data.length === 0) {
      console.log('No Recent Conversations found.');
      return;
    }
    console.log(`✅ Found ${response.data.length} Recent Conversations.`);
    response.data.forEach((recentConversation) => {
      console.log(recentConversation);
    });
  } catch (err) {
    console.error('❌ Failed to list the Recent Conversations:');
    console.error(err);
  }
}

main();
