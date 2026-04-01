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

  // The ID of the Conversation App to retrieve
  const appId = 'CONVERSATION_APP_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    const response = await sinch.conversation.app.get({
      app_id: appId,
    });
    console.log('✅ Successfully retrieved the Conversation App.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to retrieve the Conversation App with ID ${appId}:`);
    console.error(err);
  }
}

main();
