/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 */
import { VoiceV2CallbackWebhooks } from '@sinch/sdk-core';

function main() {
  try {
    const body = VoiceV2CallbackWebhooks.serializeResponse({
      callName: 'incoming',
      commands: [
        {
          command: 'messages',
          messages: [
            {
              type: 'SAY',
              say: {
                text: 'Thank you for calling. Goodbye.',
                voiceName: 'Emma',
              },
            },
          ],
        },
        {
          command: 'hangup',
        },
      ],
    });
    console.log('✅ Serialized webhook response.');
    console.log(body);
  } catch (err) {
    console.error('❌ Failed to serialize the webhook response:');
    console.error(err);
  }
}

main();
