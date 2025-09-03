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

  // The reference you defined when starting the verification process.
  const verificationReference = 'VERIFICATION_REFERENCE';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try{
    const response = await sinch.verification.verificationStatus.getByReference({
      reference: verificationReference,
    });
    console.log('✅ Successfully retrieved Verification.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to retrieve the Verification with reference ${verificationReference}:`);
    console.error(err);
  }
}

main();
