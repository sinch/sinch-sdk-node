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
  const smsRegion = process.env.SINCH_SMS_REGION ?? 'MY_SMS_REGION';

  // The ID of the batch to get delivery reports for
  const batchId = 'BATCH_ID';
  // The phone number to get delivery reports for
  const phoneNumber = 'RECIPIENT_PHONE_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret, smsRegion });

  try {
    const response = await sinch.sms.deliveryReports.getForNumber({
      batch_id: batchId,
      phone_number: phoneNumber,
    });
    console.log('✅ Successfully retrieved a recipient delivery report for the SMS batch.');
    console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
  } catch (err) {
    console.error(`❌ Failed to retrieve delivery reports for the phone number ${phoneNumber} for the SMS batch with ID ${batchId}:`);
    console.error(err);
  }
}

main();
