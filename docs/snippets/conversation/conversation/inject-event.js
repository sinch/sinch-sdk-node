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

  // The ID of the Conversation to inject an event to
  const conversationId = 'CONVERSATION_ID';
  // The phone number of the recipient to inject an event to
  const recipientPhoneNumber = 'RECIPIENT_PHONE_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
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
    console.log('✅ Successfully injected the Event.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to inject an Event in the conversation ${conversationId} for recipient ${recipientPhoneNumber}:`);
    console.error(err);
  }
}

main();
