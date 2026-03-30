/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const projectId = process.env.SINCH_PROJECT_ID ?? 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID ?? 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET ?? 'MY_KEY_SECRET';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  // The Fax Service ID you want to list the Cover Page from
  const serviceId = 'FAX_SERVICE_ID';

  try {
    const response = await sinch.fax.coverPages.list({ serviceId });
    if (response.data.length === 0) {
      console.log('No Cover Pages found.');
      return;
    }
    console.log(`✅ Found ${response.data.length} Cover Pages.`);
    response.data.forEach((coverPage) => {
      console.log(coverPage);
    });
  } catch (err) {
    console.error('❌ Failed to list Cover Pages:');
    console.error(err);
  }
}

main();
