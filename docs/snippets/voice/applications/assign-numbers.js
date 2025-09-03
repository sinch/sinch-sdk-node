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

  // The Sinch virtual phone number to assign to the application, in E.164 format (e.g., +12025550123)
  const sinchPhoneNumber = process.env.SINCH_PHONE_NUMBER || 'MY_SINCH_PHONE_NUMBER';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    await sinch.voice.applications.assignNumbers({
      assignNumbersRequestBody: {
        numbers: [sinchPhoneNumber],
        applicationkey: applicationKey,
        capability: 'voice',
      },
    });
    console.log(`✅ Successfully assigned the number ${sinchPhoneNumber} to the application ${applicationKey}.`);
  } catch (err) {
    console.error(`❌ Failed to assign the number ${sinchPhoneNumber} to the application ${applicationKey}:`);
    console.error(err);
  }
}

main();
