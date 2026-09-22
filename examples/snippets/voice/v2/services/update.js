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

  // The ID of the service to update
  const serviceId = 'SERVICE_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  try {
    const response = await sinch.voice.v2.services.update({
      serviceId,
      updateServiceRequestBody: {
        name: 'Updated from Node SDK Snippet',
      },
    });
    console.log(`✅ Successfully updated the Voice v2 service with ID ${serviceId}.`);
    console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
  } catch (err) {
    console.error(`❌ Failed to update the Voice v2 service with ID ${serviceId}:`);
    console.error(err);
  }
}

main();
