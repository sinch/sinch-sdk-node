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

  // The ACL ID you want to list SIP Trunks for
  const aclId = 'ACL_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.elasticSipTrunking.accessControlList.listTrunks({
      id: aclId,
    });
    if (response.data.length === 0) {
      console.log(`No SIP Trunks found for the ACL with ID ${aclId}.`);
      return;
    }
    console.log(`✅ Found ${response.data.length} SIP Trunks for the ACL with ID ${aclId}.`);
    response.data.forEach((trunk) => {
      console.log(trunk);
    });
  } catch (err) {
    console.error(`❌ Failed to list the SIP Trunks for the ACL with ID ${aclId}:`);
    console.error(err);
  }
}

main();
