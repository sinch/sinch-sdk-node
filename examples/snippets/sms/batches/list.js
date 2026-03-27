/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const projectId = process.env.SINCH_PROJECT_ID ?? 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID ?? 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET ?? 'MY_KEY_SECRET';
  const smsRegion = process.env.SINCH_SMS_REGION ?? 'MY_SMS_REGION';

  const sinch = new SinchClient({ projectId, keyId, keySecret, smsRegion });
  try {
    const response = await sinch.sms.batches.list({});
    if (response.data.length === 0) {
      console.log('No batches found.');
      return;
    }
    console.log(`✅ Found ${response.data.length} batches.`);
    response.data.forEach((batch) => {
      console.log(batch);
    });
  } catch (err) {
    console.error('❌ Failed to list SMS batches:');
    console.error(err);
  }
}

main();
