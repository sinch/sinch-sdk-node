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

  // The ID of the Conversation App to list the audit records from, for a given identity
  const appId = 'CONVERSATION_APP_ID';
  // The phone number of the recipient in E.164 format without the leading '+' (e.g., 46701234567)
  const recipientPhoneNumber = 'RECIPIENT_PHONE_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret, conversationRegion });

  try {
    const response = await sinch.conversation.consents.listAuditRecords({
      app_id: appId,
      identity: recipientPhoneNumber,
    });
    console.log('✅ Successfully listed the audit records.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to list the audit records for the identity ${recipientPhoneNumber} in the Conversation App with ID ${appId}:`);
    console.error(err);
  }
}

main();
