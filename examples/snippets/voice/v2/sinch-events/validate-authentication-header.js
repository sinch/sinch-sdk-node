/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 */
import { VoiceV2SinchEvents } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

function main() {
  const serviceId = process.env.SINCH_VOICE_SERVICE_ID ?? 'MY_VOICE_SERVICE_ID';
  const serviceSecret = process.env.SINCH_VOICE_SERVICE_SECRET ?? 'MY_VOICE_SERVICE_SECRET';

  const sinchEvents = new VoiceV2SinchEvents({ serviceId, serviceSecret });

  const headers = {
    'content-type': 'application/json; charset=utf-8',
    'x-timestamp': process.env.VOICE_V2_WEBHOOK_TIMESTAMP ?? '2026-04-01T12:00:00.0000000Z',
    authorization: process.env.VOICE_V2_WEBHOOK_AUTHORIZATION
      ?? `service ${serviceId}:REPLACE_WITH_REQUEST_SIGNATURE`,
  };
  const rawBody = process.env.VOICE_V2_WEBHOOK_BODY
    ?? '{"event":"call.incoming","call":{"callId":"01AN4Z07BY79KA1307SR9X4MV3"}}';
  const path = process.env.VOICE_V2_WEBHOOK_PATH ?? '/voice-webhooks';

  try {
    const validated = sinchEvents.validateAuthenticationHeader(
      headers,
      rawBody,
      path,
      'POST',
    );
    if (validated) {
      console.log('✅ Webhook Authorization header is valid.');
    } else {
      console.error('❌ Webhook Authorization header is invalid.');
    }
  } catch (err) {
    console.error('❌ Failed to validate the webhook Authorization header:');
    console.error(err);
  }
}

main();
