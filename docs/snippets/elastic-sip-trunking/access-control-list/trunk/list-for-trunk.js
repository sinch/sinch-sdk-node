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

  // Replace with the SIP Trunk ID you want to list ACLs for
  const sipTrunkId = 'YOUR_SIP_TRUNK_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try{
    const response = await sinch.elasticSipTrunking.accessControlList.listForTrunk({
      trunkId: sipTrunkId,
    });
    if (response.data.length === 0) {
      console.log('No ACLs found for this SIP trunk.');
      return;
    }
    console.log(`✅ Found ${response.data.length} ACLs for SIP trunk with ID ${sipTrunkId}.`);
    response.data.forEach((acl) => {
      console.log(acl);
    });
  } catch (err) {
    console.error(`❌ Failed to list ACLs for SIP trunk with ID ${sipTrunkId}:`);
    console.error(err);
  }
}

main();
