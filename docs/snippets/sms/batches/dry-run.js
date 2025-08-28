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
  const smsRegion = process.env.SINCH_SMS_REGION || 'MY_SMS_REGION';

  const senderPhoneNumber = process.env.SINCH_PHONE_NUMBER || 'MY_SINCH_PHONE_NUMBER';
  const recipientPhoneNumber = 'A_RECIPIENT_PHONE_NUMBER';
  const body = 'A body text here';

  const sinch = new SinchClient({ projectId, keyId, keySecret, smsRegion });

  const response = await sinch.sms.batches.dryRun({
    dryRunRequestBody: {
      from: senderPhoneNumber,
      to: [recipientPhoneNumber],
      body,
    },
  });

  console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
})();
