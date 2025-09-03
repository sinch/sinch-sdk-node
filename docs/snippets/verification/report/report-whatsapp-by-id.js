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

  // The id you received back from the API call when starting the WhatsApp verification.
  const verificationId = 'VERIFICATION_ID';
  // The OTP is the code the user received via WhatsApp as part of the verification process.
  const receivedVerificationCode = 'OTP_CODE';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    const response = await sinch.verification.verifications.reportWhatsAppById({
      id: verificationId,
      reportWhatsAppVerificationByIdRequestBody: {
        whatsapp: {
          code: receivedVerificationCode,
        },
      },
    });
    console.log('✅ Successfully reported the OTP for the verification process via WhatsApp.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to report the OTP for the verification process via WhatsApp with ID ${verificationId}:`);
    console.error(err);
  }
}

main();
