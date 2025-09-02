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

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  // The phone number you want to verify, in E.164 format (e.g. +46701234567).
  // Make sure that the phone number is registered on WhatsApp.
  const phoneNumber = 'PHONE_NUMBER';

  try {
    const response = await sinch.verification.verifications.startWhatsApp({
      startVerificationWithWhatsAppRequestBody: {
        identity: {
          type: 'number',
          endpoint: phoneNumber,
        },
      },
    });
    console.log('✅ Successfully started the verification process via WhatsApp.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to start a verification process via WhatsApp for the phone number ${phoneNumber}:`);
    console.error(err);
  }
}

main();
