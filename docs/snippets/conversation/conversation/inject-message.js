/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

(async () => {
  const projectId = process.env.SINCH_PROJECT_ID || 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID || 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET || 'MY_KEY_SECRET';
  const conversationRegion = process.env.SINCH_CONVERSATION_REGION || 'MY_CONVERSATION_REGION';

  const conversationId = 'A_CONVERSATION_ID';
  const contactId = 'A_CONTACT_ID';
  const recipientPhoneNumber = 'A_RECIPIENT_PHONE_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

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

  console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
})();
