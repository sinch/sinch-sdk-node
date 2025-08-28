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

  const templateId = 'A_TEMPLATE_ID_TO_UPDATE';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  const response = await sinch.conversation.templatesV2.update({
    template_id: templateId,
    updateTemplateRequestBody: {
      description: 'Updated description from Templates V1 API',
      default_translation: 'en-US',
      translations: [
        {
          language_code: 'en-US',
          version: '2',
          variables: [
            {
              key: 'name',
              preview_value: 'Professor Jones',
            },
          ],
          text_message: {
            text: 'Hello ${name}. Text message template created with V2 API',
          },
        },
      ],
    },
  });

  console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
})();
