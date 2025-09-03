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

  // RCS credentials - replace with your own
  const rcsAgentId = 'RCS_SENDER_AGENT_ID';
  const rcsAgentAccessToken = 'RCS_BEARER_TOKEN';
  // Name of the Conversation App to create
  const appName = 'Created from Node.js SDK snippet';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
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
    console.log('✅ Successfully created the Conversation App.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to create the Conversation App with name ${appName}:`);
    console.error(err);
  }
}

main();
