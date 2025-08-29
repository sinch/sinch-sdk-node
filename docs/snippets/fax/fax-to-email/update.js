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

  // Replace with your Fax Service ID you want to update the email for
  const serviceId = 'YOUR_FAX_SERVICE_ID';
  // Replace with the email address you want to update the phone numbers for
  const email ='YOUR_EMAIL_ADDRESS';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try{
    const response = await sinch.fax.faxToEmail.update({
      serviceId,
      email,
      updateEmailRequestBody: {
        phoneNumbers: [
          {
            number: '+14155552222',
            permissions: 'both',
          },
        ],
      },
    });
    console.log('✅ Successfully updated the phone numbers.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to update the phone numbers associated with the email ${email} from the fax service with ID ${serviceId}:`);
    console.error(err);
  }
}

main();
