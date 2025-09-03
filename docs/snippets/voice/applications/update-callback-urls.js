/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const applicationKey = process.env.SINCH_APPLICATION_KEY ?? 'MY_APPLICATION_KEY';
  const applicationSecret = process.env.SINCH_APPLICATION_SECRET ?? 'MY_APPLICATION_SECRET';

  // The new callback URL to set for the application
  const callbackUrl = 'https://my.callback.url/voice';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    await sinch.voice.applications.updateCallbackURLs({
      applicationkey: applicationKey,
      updateCallbacksRequestBody: {
        url: {
          primary: callbackUrl,
        },
      },
    });
    console.log(`✅ Successfully updated callback URLs for application ${applicationKey}.`);
  } catch (err) {
    console.error(`❌ Failed to update callback URLs for application ${applicationKey}:`);
    console.error(err);
  }
}

main();
