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

  // The phone number you want to provision an emergency address for
  const phoneNumber = process.env.SINCH_PHONE_NUMBER ?? 'MY_SINCH_PHONE_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try{
    const response = await sinch.numbers.provisionEmergencyAddress({
      phoneNumber,
      emergencyAddressRequestBody: {
        displayName: 'Emergency Address Display Name',
        address: {
          streetNumber: '3500',
          streetInfo: 'Lenox Rd NE',
          city: 'Atlanta',
          state: 'GA',
          postalCode: '30326',
        },
      },
    });
    console.log(`✅ Successfully provisioned an emergency address for the phone number ${phoneNumber}.`);
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to provision an emergency address for the phone number ${phoneNumber}:`);
    console.error(err);
  }
}

main();
