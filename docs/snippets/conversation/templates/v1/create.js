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

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  const response = await sinch.conversation.templatesV1.create({
    createTemplateRequestBody: {
      default_translation: 'en-US',
      translations: [
        {
          language_code: 'en-US',
          version: '1',
          content: '{"location_message": {"title": "Title","coordinates": {"latitude": 59.3293,"longitude": 18.0686}}}',
        },
      ],
    },
  });

  console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
})();
