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

  // The credential list ID you want to delete
  const credentialListId = 'CREDENTIAL_LIST_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    await sinch.elasticSipTrunking.credentialLists.delete({
      id: credentialListId,
    });
    console.log(`✅ Successfully deleted the credential list with ID ${credentialListId}.`);
  } catch (err) {
    console.error(`❌ Failed to delete the credential list with ID ${credentialListId}:`);
    console.error(err);
  }
}

main();
