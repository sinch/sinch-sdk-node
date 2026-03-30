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

  // The available phone number to rent
  const phoneNumber = 'PHONE_NUMBER';
  // The service plan ID to associate with the phone number
  const servicePlanId = process.env.SINCH_SERVICE_PLAN_ID ?? 'MY_SERVICE_PLAN_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try{
    const response = await sinch.numbers.rent({
      phoneNumber: phoneNumber,
      rentNumberRequestBody: {
        smsConfiguration: {
          servicePlanId,
        },
      },
    });
    console.log('✅ Successfully rented the phone number.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to rent the phone number ${phoneNumber}:`);
    console.error(err);
  }
}

main();
