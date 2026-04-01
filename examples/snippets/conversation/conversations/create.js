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

  // The ID of the Conversation App to create the Conversation in
  const appId = 'CONVERSATION_APP_ID';
  // The ID of the Contact to create the Conversation with
  const contactId = 'CONTACT_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    const response = await sinch.conversation.conversation.create({
      createConversationRequestBody: {
        app_id: appId,
        contact_id: contactId,
      },
    });
    console.log('✅ Successfully created the Conversation.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to create the Conversation in the App ${appId} with Contact ${contactId}:`);
    console.error(err);
  }
}

main();
