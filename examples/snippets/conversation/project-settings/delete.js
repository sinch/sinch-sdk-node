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

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    await sinch.conversation.projectSettings.delete({});
    console.log('✅ Successfully deleted the Project Settings.');
  } catch (err) {
    console.error('❌ Failed to delete the Project Settings:');
    console.error(err);
  }
}

main();
