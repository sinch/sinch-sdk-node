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

  // The ID of the ACL to delete
  const aclId = 'ACL_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    await sinch.elasticSipTrunking.accessControlList.delete({
      id: aclId,
    });
    console.log(`✅ Successfully deleted the ACL with ID ${aclId}.`);
  } catch (err) {
    console.error(`❌ Failed to delete the ACL with ID ${aclId}:`);
    console.error(err);
  }
}

main();
