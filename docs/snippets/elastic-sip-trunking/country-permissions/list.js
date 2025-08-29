/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const projectId = process.env.SINCH_PROJECT_ID ?? 'YOUR_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID ?? 'YOUR_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET ?? 'YOUR_KEY_SECRET';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.elasticSipTrunking.countryPermissions.list({});
    if (response.countryPermissions?.length === 0) {
      console.log('No country permissions found.');
      return;
    }
    console.log(`✅ Found ${response.countryPermissions?.length} country permissions.`);
    response.countryPermissions?.forEach((countryPermission) => {
      console.log(countryPermission);
    });
  } catch (err) {
    console.error('❌ Failed to list country permissions:');
    console.error(err);
  }
}

main();
