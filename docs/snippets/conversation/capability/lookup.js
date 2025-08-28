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

  const appId = 'A_CONVERSATION_APP_ID_WHERE_RECIPIENT_CHANNEL_IS_CONFIGURED';
  const recipientPhoneNumber = 'A_RECIPIENT_PHONE_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

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

  console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
})();
