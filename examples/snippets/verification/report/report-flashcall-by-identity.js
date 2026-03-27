/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const applicationKey = process.env.SINCH_APPLICATION_KEY ?? 'MY_APPLICATION_KEY';
  const applicationSecret = process.env.SINCH_APPLICATION_SECRET ?? 'MY_APPLICATION_SECRET';

  // The phone number being verified via Flash Call.
  const phoneNumber = 'PHONE_NUMBER';
  // The calling number is the number shown on the missed call that the user received as part of the Flash Call verification.
  const callingNumber = 'CALLING_NUMBER';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    const response = await sinch.verification.verifications.reportFlashCallByIdentity({
      endpoint: phoneNumber,
      reportFlashCallVerificationByIdentityRequestBody: {
        flashCall: {
          cli: callingNumber,
        },
      },
    });
    console.log('✅ Successfully reported the calling number for the verification process via FlashCall.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to report the calling number for the verification process via FlashCall for the phone number ${phoneNumber}:`);
    console.error(err);
  }
}

main();
