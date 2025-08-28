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
  const recipientPhoneNumber = 'A_RECIPIENT_PHONE_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  const response = await sinch.conversation.conversation.injectEvent({
    conversation_id: conversationId,
    injectConversationEventRequestBody: {
      accept_time: new Date(),
      app_event: {
        generic_event: {
          payload: {
            'a_property_key': 'a property value',
          },
        },
      },
      channel_identity: {
        channel: 'RCS',
        identity: recipientPhoneNumber,
      },
      conversation_id: conversationId,
      processing_mode: 'CONVERSATION',
    },
  });

  console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
})();
