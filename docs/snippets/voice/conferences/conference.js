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

  const sinchPhoneNumber = process.env.SINCH_PHONE_NUMBER || 'MY_SINCH_PHONE_NUMBER';
  const conferenceId = 'AN_EXISTING_OR_TO_BE_CREATED_CONFERENCE_ID';
  const phoneNumberToBeCalled = 'PHONE_NUMBER_TO_BE_CALLED';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  const response = await sinch.voice.callouts.conference({
    conferenceCalloutRequestBody: {
      method: 'conferenceCallout',
      conferenceCallout: {
        conferenceId,
        cli: sinchPhoneNumber,
        destination: {
          type: 'number',
          endpoint: phoneNumberToBeCalled,
        },
      },
    },
  });

  console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
})();
