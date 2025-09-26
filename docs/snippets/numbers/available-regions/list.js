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
    const response = await sinch.numbers.availableRegions.list({});
    if (!response.availableRegions?.length) {
      console.log('No regions are available with these criteria.');
      return;
    }
    console.log(`✅ Found ${response.availableRegions.length} available regions.`);
    response.availableRegions.forEach((region) => {
      console.log(region);
    });
  } catch (err) {
    console.error('❌ Failed to list available regions:');
    console.error(err);
  }
}

main();
