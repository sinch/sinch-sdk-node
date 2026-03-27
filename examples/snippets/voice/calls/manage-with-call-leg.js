/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const applicationKey = process.env.SINCH_APPLICATION_KEY ?? 'MY_APPLICATION_KEY';
  const applicationSecret = process.env.SINCH_APPLICATION_SECRET ?? 'MY_APPLICATION_SECRET';

  // The ID of the call to manage
  const callId = 'CALL_ID';
  // The call leg to manage: 'caller', 'callee' or 'both
  const callLeg = 'callee';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    await sinch.voice.calls.manageWithCallLeg({
      callId,
      callLeg,
      manageWithCallLegRequestBody: {
        instructions: [
          {
            name: 'say',
            text: 'Hello, the call is over, hanging up now. Goodbye',
          },
        ],
        action: {
          name: 'hangup',
        },
      },
    });
    console.log(`✅ Successfully managed call with ID ${callId} using call leg.`);
  } catch (err) {
    console.error(`❌ Failed to manage call with ID ${callId} using call leg:`);
    console.error(err);
  }
}

main();
