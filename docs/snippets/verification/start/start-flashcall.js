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

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  const phoneNumber = 'A_PHONE_NUMBER_TO_VERIFY';

  const response = await sinch.verification.verifications.startFlashCall({
    startVerificationWithFlashCallRequestBody: {
      identity: {
        type: 'number',
        endpoint: phoneNumber,
      },
    },
  });

  console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
})();
