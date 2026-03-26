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

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    const response = await sinch.conversation.templatesV2.list({});
    if (!response.templates?.length) {
      console.log('No Templates found.');
      return;
    }
    console.log(`✅ Found ${response.templates.length} Templates.`);
    response.templates.forEach((template) => {
      console.log(template);
    });
  } catch (err) {
    console.error('❌ Failed to list the Templates:');
    console.error(err);
  }
}

main();
