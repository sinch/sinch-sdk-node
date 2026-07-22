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

  try {
    const response = await sinch.fax.faxes.exportList({
      direction: 'OUTBOUND',
    });
    console.log('✅ Successfully exported the fax list.');
    console.log(`File name: ${response.fileName}`);
    console.log(response.data);
  } catch (err) {
    console.error('❌ Failed to export the fax list:');
    console.error(err);
  }
}

main();
