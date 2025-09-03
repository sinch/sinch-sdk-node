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

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try{
    const response = await sinch.fax.services.list({});
    if (response.data.length === 0) {
      console.log('No Fax Services found.');
      return;
    }
    console.log(`✅ Found ${response.data.length} Fax Services.`);
    response.data.forEach((faxService) => {
      console.log(faxService);
    });
  } catch (err) {
    console.error('❌ Failed to list Fax Services:');
    console.error(err);
  }
}

main();
