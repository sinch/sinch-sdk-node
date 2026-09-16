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

  // The phone number to be used as the caller ID, in E.164 format (e.g., +12025550123)
  const sinchPhoneNumber = process.env.SINCH_PHONE_NUMBER || 'MY_SINCH_PHONE_NUMBER';
  // Phone numbers to call in the batch, in E.164 format (e.g., +12025550123)
  const recipientPhoneNumbers = ['RECIPIENT_PHONE_NUMBER_1', 'RECIPIENT_PHONE_NUMBER_2'];

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.voice.v2.batches.start({
      startBatchRequestBody: {
        commands: [
          {
            command: 'dial',
            callName: 'batch-reminder',
            from: {
              type: 'PHONE',
              phone: {
                number: sinchPhoneNumber,
              },
            },
            to: {
              type: 'PHONE',
              phone: {
                number: '@toNumber',
              },
            },
            dialTimeoutDurationSeconds: 30,
            maxCallDurationSeconds: 120,
            events: {
              onAnswer: [
                {
                  command: 'messages',
                  messages: [
                    {
                      type: 'SAY',
                      say: {
                        text: 'Hello, this is an automated reminder from Sinch. Goodbye.',
                        voiceName: 'Emma',
                      },
                    },
                  ],
                  events: {
                    onFinish: [
                      {
                        command: 'hangup',
                      },
                    ],
                  },
                },
              ],
              onHangup: [
                {
                  command: 'hangup',
                },
              ],
            },
          },
        ],
        parameters: recipientPhoneNumbers.map((toNumber) => ({ toNumber })),
        batchOptions: {
          maxCps: 5,
          ttlSeconds: 1800,
        },
      },
    });
    console.log(`✅ Successfully started a Voice v2 batch of calls.`);
    console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
  } catch (err) {
    console.error(`❌ Failed to start a Voice v2 batch of calls:`);
    console.error(err);
  }
}

main();
