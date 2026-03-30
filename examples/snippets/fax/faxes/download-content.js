/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import { writeFileSync } from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const projectId = process.env.SINCH_PROJECT_ID ?? 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID ?? 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET ?? 'MY_KEY_SECRET';

  // The Fax ID you want to download the content from
  const faxId = 'FAX_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.fax.faxes.downloadContent({
      id: faxId,
      fileFormat: 'pdf',
    });
    console.log('✅ Successfully downloaded the Fax content.');
    writeFileSync(`fax_${faxId}.pdf`, response.buffer);
  } catch (err) {
    console.error(`❌ Failed to download the content from the Fax with ID: ${faxId}:`);
    console.error(err);
  }
}

main();
