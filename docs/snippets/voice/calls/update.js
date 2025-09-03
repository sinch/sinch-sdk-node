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

  // The ID of the call to update
  const callId = 'CALL_ID';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    await sinch.voice.calls.update({
      callId,
      updateCallRequestBody: {
        instructions: [
          {
            name: 'sendDtmf',
            value: '1234#',
          },
        ],
        action: {
          name: 'hangup',
        },
      },
    });
    console.log(`✅ Successfully updated call with ID ${callId}.`);
  } catch (err) {
    console.error(`❌ Failed to update call with ID ${callId}:`);
    console.error(err);
  }
}

main();
