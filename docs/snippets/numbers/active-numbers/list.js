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

  const activeNumbersList = [];
  // Fetch a page of Numbers
  let response = await sinch.numbers.list({
    regionCode: 'US',
    type: 'LOCAL',
  });
  // Fetch the data page by page manually
  while (response.hasNextPage) {
    activeNumbersList.push(...response.data);
    response = await response.nextPage();
  }
  activeNumbersList.push(...response.data);

  console.log(`Full list of numbers (length = ${activeNumbersList.length}):\n${JSON.stringify(activeNumbersList, null, 2)}`);
})();
