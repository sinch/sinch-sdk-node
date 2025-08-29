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

  // Replace with the SIP Trunk ID you want to add ACLs to
  const sipTrunkId = 'YOUR_SIP_TRUNK_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.elasticSipTrunking.sipTrunks.addAccessControlList({
      trunkId: sipTrunkId,
      addAccessControlListToTrunkRequestBody: {
        accessControlListIds: [
          'AN_ACL_ID_TO_ADD',
          'ANOTHER_ACL_ID_TO_ADD',
        ],
      },
    });
    console.log('✅ Successfully added ACLs to SIP trunk.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to add ACLs to SIP trunk with ID ${sipTrunkId}:`);
    console.error(err);
  }
}

main();
