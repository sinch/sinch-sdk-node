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

  // Replace with your SIP Trunk ID to list SIP Endpoints from
  const sipTrunkId = 'YOUR_SIP_TRUNK_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.elasticSipTrunking.sipEndpoints.list({
      sipTrunkId,
    });
    if (response.data.length === 0) {
      console.log('No SIP endpoints found.');
      return;
    }
    console.log(`✅ Found ${response.data.length} SIP endpoints.`);
    response.data.forEach((endpoint) => {
      console.log(endpoint);
    });
  } catch (err) {
    console.error(`❌ Failed to list SIP endpoints for the SIP trunk with ID ${sipTrunkId}`);
    console.error(err);
  }
}

main();
