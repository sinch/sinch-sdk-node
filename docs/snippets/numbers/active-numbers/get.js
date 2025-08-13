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

  const phoneNumberToGet = process.env.SINCH_PHONE_NUMBER || 'MY_SINCH_PHONE_NUMBER';

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  const rentedNumber = await sinch.numbers.get({
    phoneNumber: phoneNumberToGet,
  });

  console.log(`Rented number:\n${JSON.stringify(rentedNumber, null, 2)}`);
})();
