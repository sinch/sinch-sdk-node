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

  // The ID of the Template to list Translations for
  const templateId = 'TEMPLATE_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    const response = await sinch.conversation.templatesV2.listTranslations({
      template_id: templateId,
    });
    if (!response.translations?.length) {
      console.log(`No Translations found for Template with ID ${templateId}.`);
      return;
    }
    console.log(`✅ Found ${response.translations.length} Translations.`);
    response.translations.forEach((translation) => {
      console.log(translation);
    });
  } catch (err) {
    console.error('❌ Failed to list the Translations:');
    console.error(err);
  }
}

main();
