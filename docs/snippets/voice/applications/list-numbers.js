/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const applicationKey = process.env.SINCH_APPLICATION_KEY ?? 'MY_APPLICATION_KEY';
  const applicationSecret = process.env.SINCH_APPLICATION_SECRET ?? 'MY_APPLICATION_SECRET';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try{
    const response = await sinch.voice.applications.listNumbers({});
    if (!response.numbers?.length) {
      console.log('No phone numbers found.');
      return;
    }
    console.log(`✅ Found ${response.numbers.length} phone numbers.`);
    response.numbers.forEach((numberInformation) => {
      console.log(numberInformation);
    });
  } catch (err) {
    console.error('❌ Failed to list phone numbers and their capabilities:');
    console.error(err);
  }
}

main();
