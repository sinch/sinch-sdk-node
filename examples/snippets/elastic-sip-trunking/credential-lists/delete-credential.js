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

  // The credential list ID that contains the credential to delete
  const credentialListId = 'CREDENTIAL_LIST_ID';
  // The username of the credential to delete
  const credentialUsername = 'CREDENTIAL_USERNAME';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    await sinch.elasticSipTrunking.credentialLists.deleteCredential({
      id: credentialListId,
      username: credentialUsername,
    });
    console.log(`✅ Successfully deleted the credential with username ${credentialUsername} from credential list ${credentialListId}.`);
  } catch (err) {
    console.error(`❌ Failed to delete the credential with username ${credentialUsername} from credential list ${credentialListId}:`);
    console.error(err);
  }
}

main();
