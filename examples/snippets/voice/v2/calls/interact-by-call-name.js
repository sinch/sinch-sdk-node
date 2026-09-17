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

  // The ID of the session that contains the call
  const sessionId = 'SESSION_ID';
  // The name of the call leg within the session, as assigned by the `callName` property in the `dial` command
  const callName = 'origin';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    await sinch.voice.v2.calls.interactByCallName({
      sessionId,
      callName,
      callPatchRequestBody: {
        commands: [
          {
            command: 'hangup',
          },
        ],
      },
    });
    console.log(`✅ Successfully submitted SVAML commands for the Voice v2 call named ${callName} in session ${sessionId}.`);
  } catch (err) {
    console.error(`❌ Failed to interact with the Voice v2 call named ${callName} in session ${sessionId}:`);
    console.error(err);
  }
}

main();
