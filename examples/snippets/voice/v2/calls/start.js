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
  // The phone number you want to call, in E.164 format (e.g., +12025550123)
  const recipientPhoneNumber = 'RECIPIENT_PHONE_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.voice.v2.calls.start({
      createCallRequestBody: {
        commands: [
          {
            command: 'dial',
            callName: 'origin',
            from: {
              type: 'PHONE',
              phone: {
                number: sinchPhoneNumber,
              },
            },
            to: {
              type: 'PHONE',
              phone: {
                number: recipientPhoneNumber,
              },
            },
            dialTimeoutDurationSeconds: 30,
            events: {
              onAnswer: [
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
              onHangup: [
                {
                  command: 'hangup',
                },
              ],
            },
          },
        ],
      },
    });
    console.log(`✅ Successfully started a Voice v2 call to ${recipientPhoneNumber}.`);
    console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
  } catch (err) {
    console.error(`❌ Failed to start a Voice v2 call to ${recipientPhoneNumber}:`);
    console.error(err);
  }
}

main();
