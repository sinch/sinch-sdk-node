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

  // The SIP Trunk ID you want to list credential lists for
  const sipTrunkId = 'SIP_TRUNK_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.elasticSipTrunking.sipTrunks.listCredentialLists({
      trunkId: sipTrunkId,
    });
    if (response.data.length === 0) {
      console.log(`No credential lists found for the SIP Trunk with ID ${sipTrunkId}.`);
      return;
    }
    console.log(`✅ Found ${response.data.length} credential lists for the SIP Trunk with ID ${sipTrunkId}.`);
    response.data.forEach((credentialList) => {
      console.log(credentialList);
    });
  } catch (err) {
    console.error(`❌ Failed to list the credential lists for the SIP Trunk with ID ${sipTrunkId}:`);
    console.error(err);
  }
}

main();
