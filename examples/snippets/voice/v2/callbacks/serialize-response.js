/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 */
import { Voice, VoiceV2CallbackWebhooks } from '@sinch/sdk-core';

function main() {
  try {
    const body = VoiceV2CallbackWebhooks.serializeResponse({
      callName: 'incoming',
      commands: new Voice.v2.CommandsSequenceCreator()
        .text('Thank you for calling. Goodbye.', 'Emma', {
          onFinish: (after) => {
            after.hangup();
          },
        })
        .build(),
    });
    console.log('✅ Serialized webhook response.');
    console.log(body);
  } catch (err) {
    console.error('❌ Failed to serialize the webhook response:');
    console.error(err);
  }
}

main();
