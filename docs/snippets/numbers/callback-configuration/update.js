/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

(async () => {
  const projectId = process.env.SINCH_PROJECT_ID || 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID || 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET || 'MY_KEY_SECRET';

  const newHmacSecret = 'NEW_HMAC_SECRET';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  const response = await sinch.numbers.callbacks.update({
    updateCallbackConfigurationRequestBody: {
      hmacSecret: newHmacSecret,
    },
  });

  console.log(`Updated callback configuration:\n${JSON.stringify(response, null, 2)}`);
})();
