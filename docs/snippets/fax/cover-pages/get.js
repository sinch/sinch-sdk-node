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

  // The Fax Service ID you want to retrieve a Cover Page from
  const serviceId = 'FAX_SERVICE_ID';
  // The Cover Page ID you want to retrieve
  const coverPageId = 'COVER_PAGE_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.fax.coverPages.get({ serviceId, coverPageId });
    console.log('✅ Successfully retrieved the Cover Page.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to retrieve the Cover Page with ID ${coverPageId} from the Fax Service with ID ${serviceId}:`);
    console.error(err);
  }
}

main();
