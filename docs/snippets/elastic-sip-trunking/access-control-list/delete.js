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

  // Replace this with your ACL ID you want to delete
  const aclId = 'YOUR_ACL_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    await sinch.elasticSipTrunking.accessControlList.delete({
      id: aclId,
    });
    console.log(`✅ Successfully deleted ACL with ID ${aclId}.`);
  } catch (err) {
    console.error(`❌ Failed to delete ACL with ID ${aclId}:`);
    console.error(err);
  }
}

main();
