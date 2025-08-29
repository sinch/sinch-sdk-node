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

  // Replace with the SIP Trunk ID you want to list IP ranges for
  const aclId = 'YOUR_ACL_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.elasticSipTrunking.accessControlList.listIpRanges({
      accessControlListId: aclId,
    });
    if (response.data.length === 0) {
      console.log('No IP ranges found for this ACL.');
      return;
    }
    console.log(`✅ Found ${response.data.length} IP ranges for ACL with ID ${aclId}.`);
    response.data.forEach((ipRange) => {
      console.log(ipRange);
    });
  } catch (err) {
    console.error(`❌ Failed to list IP ranges for ACL with ID ${aclId}:`);
    console.error(err);
  }
}

main();
