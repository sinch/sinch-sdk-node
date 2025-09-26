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

  // The Fax Service ID you want to delete
  const serviceId = 'FAX_SERVICE_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    await sinch.fax.services.delete({ serviceId });
    console.log(`✅ Successfully deleted the Fax Service with ID ${serviceId}.`);
  } catch (err) {
    console.error(`❌ Failed to delete the Fax Service with ID ${serviceId}:`);
    console.error(err);
  }
}

main();
