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

  // The Fax ID you want to retrieve
  const faxId = 'FAX_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.fax.faxes.get({ id: faxId });
    console.log('✅ Successfully retrieved the Fax.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to retrieve the Fax with ID: ${faxId}:`);
    console.error(err);
  }
}

main();
