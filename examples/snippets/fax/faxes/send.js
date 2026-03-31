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

  // The recipient number you want to send a Fax to
  const faxRecipientNumber = 'FAX_RECIPIENT_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.fax.faxes.send({
      sendFaxRequestBody: {
        to: faxRecipientNumber,
        contentUrl: 'https://developers.sinch.com/fax/fax.pdf',
      },
    });
    console.log('✅ Successfully sent the Fax.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to send the Fax to the recipient number ${faxRecipientNumber}:`);
    console.error(err);
  }
}

main();
