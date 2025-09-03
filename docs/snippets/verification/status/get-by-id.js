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

  // The id you received back from the API call when starting the verification.
  const verificationId = 'VERIFICATION_ID';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    const response = await sinch.verification.verificationStatus.getById({
      id: verificationId,
    });
    console.log('✅ Successfully retrieved Verification.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to retrieve the Verification with ID ${verificationId}:`);
    console.error(err);
  }
}

main();
