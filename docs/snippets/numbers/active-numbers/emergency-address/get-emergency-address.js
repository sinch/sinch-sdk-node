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

  // The phone number for which you want to retrieve the emergency address
  const phoneNumber = process.env.SINCH_PHONE_NUMBER ?? 'MY_SINCH_PHONE_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try{
    const response = await sinch.numbers.getEmergencyAddress({ phoneNumber });
    console.log(`✅ Successfully retrieved the Emergency Address for the phone number ${phoneNumber}.`);
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to retrieve the Emergency Address for the phone number ${phoneNumber}:`);
    console.error(err);
  }
}

main();
