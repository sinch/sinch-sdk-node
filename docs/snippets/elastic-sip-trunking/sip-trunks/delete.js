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

  // Replace with the SIP Trunk ID you want to delete
  const sipTrunkId = 'YOUR_SIP_TRUNK_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try{
    await sinch.elasticSipTrunking.sipTrunks.delete({ sipTrunkId });
    console.log(`✅ Successfully deleted SIP trunk with ID ${sipTrunkId}.`);
  } catch (err) {
    console.error(`❌ Failed to delete SIP trunk with ID ${sipTrunkId}:`);
    console.error(err);
  }
}

main();
