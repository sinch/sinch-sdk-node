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

  // The Fax Service ID you want to remove the email from
  const serviceId = 'FAX_SERVICE_ID';
  // The email you want to remove
  const email ='EMAIL_ADDRESS';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    await sinch.fax.faxToEmail.delete({
      serviceId,
      email,
    });
    console.log(`✅ Successfully deleted the Email ${email} from the Fax Service with ID ${serviceId}.`);
  } catch (err) {
    console.error(`❌ Failed to delete the Email ${email} from the Fax Service with ID ${serviceId}:`);
    console.error(err);
  }
}

main();
