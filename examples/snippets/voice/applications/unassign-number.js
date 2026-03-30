/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const applicationKey = process.env.SINCH_APPLICATION_KEY ?? 'MY_APPLICATION_KEY';
  const applicationSecret = process.env.SINCH_APPLICATION_SECRET ?? 'MY_APPLICATION_SECRET';

  // The phone number to unassign from the application, in E.164 format (e.g., +12025550123)
  const sinchPhoneNumber = process.env.SINCH_PHONE_NUMBER || 'MY_SINCH_PHONE_NUMBER';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    await sinch.voice.applications.unassignNumber({
      unassignNumbersRequestBody: {
        number: sinchPhoneNumber,
        applicationkey: applicationKey,
      },
    });
    console.log(`✅ Successfully unassigned the number ${sinchPhoneNumber} from the application ${applicationKey}.`);
  } catch (err) {
    console.error(`❌ Failed to unassign the number ${sinchPhoneNumber} to the application ${applicationKey}:`);
    console.error(err);
  }
}

main();
