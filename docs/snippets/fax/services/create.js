/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
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
    const response = await sinch.fax.services.create({
      createServiceRequestBody: {
        name: 'My new Fax Service',
        defaultForProject: true,
      },
    });
    console.log('✅ Successfully created the Fax Service.');
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error('❌ Failed to create the Fax Service:');
    console.error(err);
  }
}

main();
