/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const projectId = process.env.SINCH_PROJECT_ID ?? 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID ?? 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET ?? 'MY_KEY_SECRET';

  // The Fax Service ID you want to list numbers for
  const serviceId = 'FAX_SERVICE_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.fax.services.listNumbers({ serviceId });
    if (response.data.length === 0) {
      console.log('No Phone Numbers found.');
      return;
    }
    console.log(`✅ Found ${response.data.length} Phone Numbers.`);
    response.data.forEach((servicePhoneNumber) => {
      console.log(servicePhoneNumber);
    });
  } catch (err) {
    console.error(`❌ Failed to list the Phone Numbers for the Fax Service with ID ${serviceId}:`);
    console.error(err);
  }
}

main();
