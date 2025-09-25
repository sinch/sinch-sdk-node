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

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  // The Fax Service ID you want to add the Cover Page to
  const serviceId = 'FAX_SERVICE_ID';

  try {
    const response = await sinch.fax.coverPages.add({
      serviceId,
      addCoverPageRequestBody: {
        name: 'New cover page created with the Node.js SDK',
        file: {
          fileContent: 'V2VsY29tZSB0byBTaW5jaCE=',
          fileType: 'PDF',
        },
      },
    });
    console.log('✅ Successfully added a cover page to the Fax Service.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error('❌ Failed to add a cover page to the Fax Service:');
    console.error(err);
  }
}

main();
