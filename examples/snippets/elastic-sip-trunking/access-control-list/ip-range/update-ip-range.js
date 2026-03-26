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

  // The ACL ID you want to update ACL from
  const aclId = 'ACL_ID';
  // The IP Range ID you want to update
  const ipRangeId = 'IP_RANGE_ID';

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
    console.log('✅ Successfully updated the IP Range.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to update the IP Range ${ipRangeId} in the ACL with ID ${aclId}:`);
    console.error(err);
  }
}

main();
