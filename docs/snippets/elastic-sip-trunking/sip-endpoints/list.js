/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const projectId = process.env.SINCH_PROJECT_ID ?? 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID ?? 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET ?? 'MY_KEY_SECRET';

  // The SIP Trunk ID to list SIP Endpoints from
  const sipTrunkId = 'SIP_TRUNK_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.elasticSipTrunking.sipEndpoints.list({
      sipTrunkId,
    });
    if (response.data.length === 0) {
      console.log(`No SIP Endpoints found for the SIP Trunk with ID ${sipTrunkId}.`);
      return;
    }
    console.log(`✅ Found ${response.data.length} SIP Endpoints.`);
    response.data.forEach((endpoint) => {
      console.log(endpoint);
    });
  } catch (err) {
    console.error(`❌ Failed to list the SIP Endpoints for the SIP Trunk with ID ${sipTrunkId}`);
    console.error(err);
  }
}

main();
