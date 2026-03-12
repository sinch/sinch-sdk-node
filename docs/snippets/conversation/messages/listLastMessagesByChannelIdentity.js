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

  // Channel identities to fetch the last message (can be phone numbers, social media IDs, etc. depending on the channel)
  const channelIdentities = ['CHANNEL_IDENTITY_1', 'CHANNEL_IDENTITY_2'];

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    const response = await sinch.conversation.messages.listLastMessagesByChannelIdentity({
      listLastMessagesByChannelIdentityRequestBody: {
        channel_identities: channelIdentities,
        messages_source: 'DISPATCH_SOURCE',
      },
    });
    if (response.data.length === 0) {
      console.log('No Messages found for the specified identities.');
      return;
    }
    console.log(`✅ Found ${response.data.length} Messages.`);
    response.data.forEach((message) => {
      console.log(message);
    });
  } catch (err) {
    console.error('❌ Failed to list the Messages for the specified identities:');
    console.error(err);
  }
}

main();
