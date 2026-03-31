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

  // The ID of the ACL to which to add an IP range
  const aclId = 'ACL_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.elasticSipTrunking.accessControlList.addIpRange({
      accessControlListId: aclId,
      addIpRangeRequestBody: {
        description: 'IP range name',
        ipAddress: '11.12.13.14',
        range: 27,
      },
    });
    console.log('✅ Successfully added IP range to ACL:');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to add IP range to the ACL with ID ${aclId}:`);
    console.error(err);
  }
}

main();
