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

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    const response = await sinch.conversation.app.list({});
    if (!response.apps?.length) {
      console.log('No Conversation Apps found.');
      return;
    }
    console.log(`✅ Found ${response.apps.length} Conversation Apps.`);
    response.apps.forEach((app) => {
      console.log(app);
    });
  } catch (err) {
    console.error('❌ Failed to list Conversation Apps:');
    console.error(err);
  }
}

main();
