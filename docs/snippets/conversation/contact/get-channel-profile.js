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

  // The ID of the Conversation App where the channel is configured
  const appId = 'CONVERSATION_APP_ID';
  // The ID of the contact to fetch the channel profile for
  const contactId = 'CONTACT_ID';
  // Supported channels: 'MESSENGER', 'INSTAGRAM', 'LINE'
  const channel = 'MESSENGER';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    const response = await sinch.conversation.contact.getChannelProfile({
      getChannelProfileRequestBody: {
        app_id: appId,
        channel,
        recipient: {
          contact_id: contactId,
        },
      },
    });
    console.log('✅ Successfully retrieved the channel profile for the Contact.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to retrieve the channel profile (on ${channel}) for the Contact with ID ${contactId}:`);
    console.error(err);
  }
}

main();
