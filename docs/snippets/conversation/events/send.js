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

  const applicationId = 'A_CONVERSATION_APP_ID';
  const recipientPhoneNumber = 'A_PHONE_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  const response = await sinch.conversation.events.send({
    sendEventRequestBody: {
      app_id: applicationId,
      event: {
        composing_event: {},
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

  console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
})();
