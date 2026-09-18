/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 */
import { VoiceV2CallbackWebhooks } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

function main() {
  const eventBody = process.env.VOICE_V2_WEBHOOK_BODY
    ?? JSON.stringify({
      event: 'call.incoming',
      call: {
        callId: '01AN4Z07BY79KA1307SR9X4MV3',
        projectId: '5c5bf2b1-35ae-4825-ab89-457e07bb60e6',
        serviceId: 'a74b1566-0f18-4f8e-9c23-8e6b5df8fd3e',
        sessionId: '01AN4Z07BY79KA1307SR9X4MV2',
        direction: 'INBOUND',
        originationType: 'PHONE',
        callType: 'PHONE',
        callResult: 'INITIATED',
        startTime: '2025-06-01T10:00:00Z',
        callRate: {
          currencyCode: 'USD',
          amount: '0.0060',
        },
        callResourceUrl: 'https://voice.api.sinch.com/v2/projects/5c5bf2b1-35ae-4825-ab89-457e07bb60e6/calls/01AN4Z07BY79KA1307SR9X4MV3',
      },
    });

  try {
    const event = VoiceV2CallbackWebhooks.parseEvent(eventBody);
    if (!event.call) {
      throw new Error('Parsed webhook event is missing the required call payload.');
    }
    console.log(`✅ Parsed webhook event "${event.event}" for call ${event.call.callId}.`);
    console.log(`Call:\n${JSON.stringify(event.call, null, 2)}`);
  } catch (err) {
    console.error('❌ Failed to parse the webhook event:');
    console.error(err);
  }
}

main();
