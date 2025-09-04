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

  // The Fax Service ID you want to add email for
  const serviceId = 'FAX_SERVICE_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try{
    const response = await sinch.fax.faxToEmail.addToNumbers({
      serviceId,
      emailRequestBody: {
        email: 'user@domain.com',
        phoneNumbers: [
          {
            number: '+14155552222',
            permissions: 'both',
          },
        ],
      },
    });
    console.log('✅ Successfully added an Email to the Fax Service.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to add an Email to the Fax Service with ID ${serviceId}:`);
    console.error(err);
  }
}

main();
