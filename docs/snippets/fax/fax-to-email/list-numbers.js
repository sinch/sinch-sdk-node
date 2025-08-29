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

  // Replace with your Fax Service ID you want to list phone numbers associated with an email address for
  const serviceId = 'YOUR_FAX_SERVICE_ID';
  // Replace with the email address you want to get numbers for
  const email ='YOUR_EMAIL_ADDRESS';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try{
    const response = await sinch.fax.faxToEmail.listNumbers({
      serviceId,
      email,
    });
    if (response.data.length === 0) {
      console.log('No phone numbers found.');
      return;
    }
    console.log(`✅ Found ${response.data.length} phone numbers.`);
    response.data.forEach((servicePhoneNumber) => {
      console.log(servicePhoneNumber);
    });
  } catch (err) {
    console.error(`❌ Failed to list the configured numbers associated with the email address ${email} and to the fax service with ID ${serviceId}:`);
    console.error(err);
  }
}

main();
