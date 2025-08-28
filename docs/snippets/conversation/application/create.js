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

  const rcsAgentId = 'RCS_SENDER_AGENT_ID';
  const rcsAgentAccessToken = 'RCS_BEARER_TOKEN';
  const appName = 'Created from Node.js SDK snippet';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  const response = await sinch.conversation.app.create({
    appCreateRequestBody: {
      display_name: appName,
      channel_credentials: [
        {
          channel: 'RCS',
          static_bearer: {
            claimed_identity: rcsAgentId,
            token: rcsAgentAccessToken,
          },
        },
      ],
    },
  });

  console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
})();
