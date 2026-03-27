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

  // The ID of the Conversation App to send the message from
  const appId = 'CONVERSATION_APP_ID';
  // The phone number of the recipient in E.164 format
  const recipientPhoneNumber = 'RECIPIENT_PHONE_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    const response = await sinch.conversation.messages.send({
      sendMessageRequestBody :{
        app_id: appId,
        message: {
          text_message: {
            text: '[Node.js SDK: Conversation Message] Sample text message',
          },
        },
        recipient: {
          identified_by: {
            channel_identities: [
              {
                channel: 'RCS',
                identity: recipientPhoneNumber,
              },
            ],
          },
        },
      },
    });
    console.log('✅ Successfully sent Message.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to send Message to the phone number ${recipientPhoneNumber}:`);
    console.error(err);
  }
}

main();
