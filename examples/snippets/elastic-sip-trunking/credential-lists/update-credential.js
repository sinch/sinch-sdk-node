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

  // The credential list ID that contains the credential to update
  const credentialListId = 'CREDENTIAL_LIST_ID';
  // The username of the credential to update
  const credentialUsername = 'CREDENTIAL_USERNAME';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.elasticSipTrunking.credentialLists.updateCredential({
      id: credentialListId,
      username: credentialUsername,
      updateCredentialPasswordRequestBody: {
        password: 'newSecurePassword123[]',
      },
    });
    console.log('✅ Successfully updated the credential password.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to update the credential with username ${credentialUsername} in credential list ${credentialListId}:`);
    console.error(err);
  }
}

main();
