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

  try{
    const response = await sinch.numbers.searchForAvailableNumbers({
      regionCode: 'US',
      type: 'LOCAL',
    });
    if (!response.availableNumbers?.length) {
      console.log('No phone numbers are available with these criteria.');
      return;
    }
    console.log(`✅ Found ${response.availableNumbers.length} numbers to rent.`);
    response.availableNumbers.forEach((number) => {
      console.log(number);
    });
  } catch (err) {
    console.error('❌ Failed to list phone numbers to rent:');
    console.error(err);
  }
}

main();
