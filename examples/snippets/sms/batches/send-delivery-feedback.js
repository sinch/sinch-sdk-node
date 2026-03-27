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
  const smsRegion = process.env.SINCH_SMS_REGION ?? 'MY_SMS_REGION';

  // The recipient phone number, in E.164 format (e.g., +46701234567)
  const recipientPhoneNumber = 'RECIPIENT_PHONE_NUMBER';
  // The batch ID from which the message was sent
  const batchId = 'BATCH_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret, smsRegion });

  try {
    const response = await sinch.sms.batches.sendDeliveryFeedback({
      batch_id: batchId,
      deliveryFeedbackRequestBody: {
        recipients: [recipientPhoneNumber],
      },
    });
    console.log('✅ Successfully sent delivery feedback for the SMS batch.');
    console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
  } catch (err) {
    console.error(`❌ Failed to send delivery feedback for recipient ${recipientPhoneNumber} for the SMS batch with ID ${batchId}:`);
    console.error(err);
  }
}

main();
