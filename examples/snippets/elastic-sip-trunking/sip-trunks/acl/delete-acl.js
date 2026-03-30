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

  // The SIP Trunk ID you want to delete an ACL from
  const sipTrunkId = 'SIP_TRUNK_ID';
  // The ACL ID you want to delete from the SIP Trunk
  const aclId = 'ACL_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    await sinch.elasticSipTrunking.sipTrunks.deleteAccessControlList({
      trunkId: sipTrunkId,
      accessControlListId: aclId,
    });
    console.log(`✅ Successfully deleted the ACL ${aclId} from the SIP Trunk with ID ${sipTrunkId}.`);
  } catch (err) {
    console.error(`❌ Failed to delete the ACL ${aclId} from the SIP Trunk with ID ${sipTrunkId}:`);
    console.error(err);
  }
}

main();
