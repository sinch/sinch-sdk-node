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

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  // The phone number you want to verify, in E.164 format (e.g. +46701234567).
  const phoneNumber = 'PHONE_NUMBER';

  try {
    const response = await sinch.verification.verifications.startFlashCall({
      startVerificationWithFlashCallRequestBody: {
        identity: {
          type: 'number',
          endpoint: phoneNumber,
        },
      },
    });
    console.log('✅ Successfully started the verification process via FlashCall.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to start a verification process via FlashCall for the phone number ${phoneNumber}:`);
    console.error(err);
  }
}

main();
