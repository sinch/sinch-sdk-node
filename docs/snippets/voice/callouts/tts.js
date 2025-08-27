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

  const recipientPhoneNumber = 'PHONE_NUMBER_TO_BE_CALLED'; // E.164 format
  const textToSpeech = 'Hello, this is a call initiated from the Sinch Node.js SDK. Goodbye.';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  const response = await sinch.voice.callouts.tts({
    ttsCalloutRequestBody: {
      method: 'ttsCallout',
      ttsCallout: {
        destination: {
          type: 'number',
          endpoint: recipientPhoneNumber,
        },
        text: textToSpeech,
      },
    },
  });

  console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
})();
