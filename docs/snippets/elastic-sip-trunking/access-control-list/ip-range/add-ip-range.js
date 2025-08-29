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

  // Replace with the ACL ID you want to add the IP range to
  const aclId = 'YOUR_ACL_ID';

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
    console.error(`❌ Failed to add IP range to ACL with ID ${aclId}:`);
    console.error(err);
  }
}

main();
