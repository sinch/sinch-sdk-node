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

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.voice.v2.svaml.describe({
      describeSvamlRequestBody: {
        svaml: {
          commands: [
            {
              command: 'messages',
              messages: [
                {
                  type: 'SAY',
                  say: {
                    text: 'Hello, your call is now connected.',
                    voiceName: 'Emma',
                  },
                },
              ],
            },
          ],
        },
      },
    });
    console.log('✅ Successfully described a Voice v2 SVAML payload.');
    console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
  } catch (err) {
    console.error('❌ Failed to describe a Voice v2 SVAML payload:');
    console.error(err);
  }
}

main();
