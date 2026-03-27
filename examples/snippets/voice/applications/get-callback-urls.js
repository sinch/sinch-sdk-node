/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const applicationKey = process.env.SINCH_APPLICATION_KEY ?? 'MY_APPLICATION_KEY';
  const applicationSecret = process.env.SINCH_APPLICATION_SECRET ?? 'MY_APPLICATION_SECRET';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    const response = await sinch.voice.applications.getCallbackURLs({
      applicationkey: applicationKey,
    });
    console.log(`✅ Successfully retrieved callback URLs for application ${applicationKey}:`);
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to retrieve callback URLs for application ${applicationKey}:`);
    console.error(err);
  }
}

main();
