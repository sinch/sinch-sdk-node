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

  // The ID of the Conversation to inject a message into
  const conversationId = 'CONVERSATION_ID';
  // The ID of the Contact to inject a message into
  const contactId = 'CONTACT_ID';
  // The phone number of the recipient in E.164 format as identity for a given channel
  const recipientPhoneNumber = 'RECIPIENT_PHONE_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    const response = await sinch.conversation.conversation.injectMessage({
      conversation_id: conversationId,
      injectMessageRequestBody: {
        contact_id: contactId,
        contact_message: {
          text_message: {
            text: 'Text from Inject AppMessage',
          },
        },
        channel_identity: {
          channel: 'RCS',
          identity: recipientPhoneNumber,
        },
        direction: 'TO_CONTACT',
        accept_time: new Date(),
      },
    });
    console.log('✅ Successfully injected the Message.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to inject a Message in the conversation ${conversationId} for recipient ${recipientPhoneNumber}:`);
    console.error(err);
  }
}

main();
