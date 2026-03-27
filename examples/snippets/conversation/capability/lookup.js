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

  // The ID of the Conversation App where the recipient channel is configured
  const appId = 'CONVERSATION_APP_ID';
  // The phone number of the recipient to look up the capabilities for
  const recipientPhoneNumber = 'RECIPIENT_PHONE_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    const response = await sinch.conversation.capability.lookup({
      lookupCapabilityRequestBody: {
        app_id: appId,
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
    console.log('✅ Successfully looked up the recipient capabilities - check the CAPABILITY webhook for the result.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to look up the recipient capabilities for phone number ${recipientPhoneNumber}:`);
    console.error(err);
  }
}

main();
