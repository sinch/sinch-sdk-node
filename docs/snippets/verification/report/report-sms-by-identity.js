/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const applicationKey = process.env.SINCH_APPLICATION_KEY ?? 'MY_APPLICATION_KEY';
  const applicationSecret = process.env.SINCH_APPLICATION_SECRET ?? 'MY_APPLICATION_SECRET';

  // The phone number being verified via SMS.
  const phoneNumber = 'PHONE_NUMBER';
  // The OTP is the code the user received via SMS as part of the verification process.
  const receivedVerificationCode = 'OTP_CODE';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    const response = await sinch.verification.verifications.reportSmsByIdentity({
      endpoint: phoneNumber,
      reportSmsVerificationByIdentityRequestBody: {
        sms: {
          code: receivedVerificationCode,
        },
      },
    });
    console.log('✅ Successfully reported the OTP for the verification process via SMS.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌  Failed to report the OTP for the verification process via SMS for the phone number ${phoneNumber}:`);
    console.error(err);
  }
}

main();
