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

  // Replace with the ACL ID you want to update ACL from
  const aclId = 'YOUR_ACL_ID';
  // Replace with the IP Range ID you want to update
  const ipRangeId = 'YOUR_IP_RANGE_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.elasticSipTrunking.accessControlList.updateIpRange({
      accessControlListId: aclId,
      ipRangeId: ipRangeId,
      updateIpRangeRequestBody: {
        ipAddress: '11.12.13.14',
        range: 27,
      },
    });
    console.log('✅ Successfully updated IP Range.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to update IP Range ${ipRangeId} in the ACL with ID ${aclId}:`);
    console.error(err);
  }
}

main();
