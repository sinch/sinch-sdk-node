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

  // The ID of the conversation application that must contain the target channels for transcoding
  const appId = 'CONVERSATION_APP_ID';
  // Add other channels as needed, e.g., 'SMS', 'RCS', 'MESSENGER'.
  const targetChannels = ['WHATSAPP'];

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    const response = await sinch.conversation.transcoding.transcodeMessage({
      transcodeMessageRequestBody: {
        app_id: appId,
        app_message: {
          location_message: {
            title: 'Coordinates title',
            coordinates: {
              latitude: 59.3360453,
              longitude: 18.0117363,
            },
          },
        },
        channels: targetChannels,
      },
    });
    console.log('✅ Successfully transcoded the message.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error('❌ Failed to transcode the message:');
    console.error(err);
  }
}

main();
