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
    const response = await sinch.conversation.contact.listIdentityConflicts({});
    if (response.data.length === 0) {
      console.log('No Identity Conflicts found.');
      return;
    }
    console.log(`✅ Found ${response.data.length} Identity Conflicts.`);
    response.data.forEach((identityConflict) => {
      console.log(identityConflict);
    });
  } catch (err) {
    console.error('❌ Failed to list the Identity Conflicts:');
    console.error(err);
  }
}

main();
