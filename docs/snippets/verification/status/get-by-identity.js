/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const applicationKey = process.env.SINCH_APPLICATION_API_KEY ?? 'MY_APP_KEY_ID';
  const applicationSecret = process.env.SINCH_APPLICATION_API_SECRET ?? 'MY_APP_KEY_SECRET';

  // The phone number you are verifying, in E.164 format (e.g. +46701234567).
  // This should be the same number you used when starting the verification.
  const phoneNumber = 'PHONE_NUMBER';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    const response = await sinch.verification.verificationStatus.getByIdentity({
      endpoint: phoneNumber,
      method: 'sms',
    });
    console.log('✅ Successfully retrieved Verification.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to retrieve the Verification for the phone number ${phoneNumber}:`);
    console.error(err);
  }
}

main();
