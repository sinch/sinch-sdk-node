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

  // The sender phone number (Sinch virtual number, alphanumeric sender ID, or short code)
  const senderNumber = 'SENDER_NUMBER';
  // The recipient phone number, in E.164 format (e.g., +46701234567)
  const recipientPhoneNumber = 'RECIPIENT_PHONE_NUMBER';
  // The body of the SMS message
  const body = 'A body text here';

  const sinch = new SinchClient({ projectId, keyId, keySecret, smsRegion });

  try {
    const response = await sinch.sms.batches.send({
      sendSMSRequestBody: {
        from: senderNumber,
        to: [recipientPhoneNumber],
        body,
      },
    });
    console.log('✅ Successfully sent the SMS batch.');
    console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
  } catch (err) {
    console.error('❌ Failed to send the SMS batch:');
    console.error(err);
  }
}

main();
