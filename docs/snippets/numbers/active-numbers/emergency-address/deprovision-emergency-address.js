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

  // The phone number you want to remove the emergency address from
  const phoneNumber = process.env.SINCH_PHONE_NUMBER ?? 'MY_SINCH_PHONE_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try{
    await sinch.numbers.deprovisionEmergencyAddress({ phoneNumber });
    console.log(`✅ Successfully deprovisioned the emergency address from the phone number ${phoneNumber}.`);
  } catch (err) {
    console.error(`❌ Failed to deprovision the emergency address from the phone number ${phoneNumber}:`);
    console.error(err);
  }
}

main();
