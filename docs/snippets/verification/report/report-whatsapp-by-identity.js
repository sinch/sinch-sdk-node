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

  // The phone number being verified via WhatsApp.
  const phoneNumber = 'PHONE_NUMBER';
  // The OTP is the code the user received via WhatsApp as part of the verification process.
  const receivedVerificationCode = 'OTP_CODE';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    const response = await sinch.verification.verifications.reportWhatsAppByIdentity({
      endpoint: phoneNumber,
      reportWhatsAppVerificationByIdentityRequestBody: {
        whatsapp: {
          code: receivedVerificationCode,
        },
      },
    });
    console.log('✅ Successfully reported the OTP for the verification process via WhatsApp.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌  Failed to report the OTP for the verification process via WhatsApp for the phone number ${phoneNumber}:`);
    console.error(err);
  }
}

main();
