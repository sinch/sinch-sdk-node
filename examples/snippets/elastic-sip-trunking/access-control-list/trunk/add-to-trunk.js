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

  // The SIP Trunk ID you want to add ACLs to
  const sipTrunkId = 'SIP_TRUNK_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try{
    const response = await sinch.elasticSipTrunking.accessControlList.addToTrunk({
      trunkId: sipTrunkId,
      addAccessControlListToTrunkRequestBody: {
        accessControlListIds: [
          'AN_ACL_ID_TO_ADD',
          'ANOTHER_ACL_ID_TO_ADD',
        ],
      },
    });
    console.log('✅ Successfully added the ACLs to the SIP Trunk.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to add the ACLs to the SIP Trunk with ID ${sipTrunkId}:`);
    console.error(err);
  }
}

main();
