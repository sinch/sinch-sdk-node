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

  // Replace with the recipient number you want to send a fax to
  const faxRecipientNumber = 'FAX_RECIPIENT_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try{
    const response = await sinch.fax.faxes.send({
      sendFaxRequestBody: {
        to: faxRecipientNumber,
        contentUrl: 'https://developers.sinch.com/fax/fax.pdf',
      },
    });
    console.log('✅ Successfully sent Fax.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error('❌ Failed to send Fax:');
    console.error(err);
  }
}

main();
