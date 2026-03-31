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

  // The ID of the ACL to list the IP ranges from
  const aclId = 'ACL_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.elasticSipTrunking.accessControlList.listIpRanges({
      accessControlListId: aclId,
    });
    if (response.data.length === 0) {
      console.log(`No IP ranges found for the ACL with ID ${aclId}.`);
      return;
    }
    console.log(`✅ Found ${response.data.length} IP ranges for ACL with ID ${aclId}.`);
    response.data.forEach((ipRange) => {
      console.log(ipRange);
    });
  } catch (err) {
    console.error(`❌ Failed to list the IP ranges for the ACL with ID ${aclId}:`);
    console.error(err);
  }
}

main();
