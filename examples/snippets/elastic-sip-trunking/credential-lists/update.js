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

  // The credential list ID you want to update
  const credentialListId = 'CREDENTIAL_LIST_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.elasticSipTrunking.credentialLists.update({
      id: credentialListId,
      updateCredentialListRequestBody: {
        name: 'Updated credential list name',
      },
    });
    console.log(`✅ Successfully updated the credential list with ID ${credentialListId}.`);
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to update the credential list with ID ${credentialListId}:`);
    console.error(err);
  }
}

main();
