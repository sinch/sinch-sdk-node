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

  const sinch = new SinchClient({ projectId, keyId, keySecret });

  const requestData = {
    regionCode: 'US',
    type: 'LOCAL',
  };

  console.log('List of numbers printed one by one:');
  // Use the iterator and fetch data from all the pages automatically
  for await (const rentedNumber of sinch.numbers.list(requestData)) {
    console.log(JSON.stringify(rentedNumber, null, 2));
  }
})();
