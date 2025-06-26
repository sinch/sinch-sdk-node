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

  const phoneNumberToUpdate = process.env.SINCH_PHONE_NUMBER || 'MY_SINCH_PHONE_NUMBER';
  const updatedDisplayName = 'Updated name with Sinch Node.js SDK';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  const updatedNumber = await sinch.numbers.update({
    phoneNumber: phoneNumberToUpdate,
    updateActiveNumberRequestBody: {
      displayName: updatedDisplayName,
    },
  });

  console.log(`Updated number:\n${JSON.stringify(updatedNumber, null, 2)}`);
})();
