/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const applicationKey = process.env.SINCH_APPLICATION_KEY ?? 'MY_APPLICATION_KEY';
  const applicationSecret = process.env.SINCH_APPLICATION_SECRET ?? 'MY_APPLICATION_SECRET';

  // The ID of the call to retrieve
  const callId = 'CALL_ID';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    const response = await sinch.voice.calls.get({ callId });
    console.log('✅ Successfully retrieved call.');
    console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
  } catch (err) {
    console.error(`❌ Failed to retrieve call with ID ${callId}:`);
    console.error(err);
  }
}

main();
