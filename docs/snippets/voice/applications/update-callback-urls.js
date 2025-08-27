/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

(async () => {
  const applicationKey = process.env.SINCH_APPLICATION_API_KEY || 'MY_APP_KEY_ID';
  const applicationSecret = process.env.SINCH_APPLICATION_API_SECRET || 'MY_APP_KEY_SECRET';

  const callbackUrl = 'https://my.callback.url/voice';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  await sinch.voice.applications.updateCallbackURLs({
    applicationkey: applicationKey,
    updateCallbacksRequestBody: {
      url: {
        primary: callbackUrl,
      },
    },
  });

  console.log('Done');
})();
