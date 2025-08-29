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

  // Replace with your Fax Service ID you want to list emails associated with a phone number for
  const serviceId = 'YOUR_FAX_SERVICE_ID';
  // Replace with the phone numbers you want to get emails for
  const phoneNumber ='YOUR_PHONE_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try{
    const response = await sinch.fax.faxToEmail.listForNumber({
      serviceId,
      phoneNumber,
    });
    if (response.data.length === 0) {
      console.log('No emails found.');
      return;
    }
    console.log(`✅ Found ${response.data.length} emails.`);
    response.data.forEach((email) => {
      console.log(email);
    });
  } catch (err) {
    console.error(`❌ Failed to list the configured emails associated with the phone number ${phoneNumber} and to the fax service with ID ${serviceId}:`);
    console.error(err);
  }
}

main();
