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

  // The ID of the group to delete
  const groupId = 'GROUP_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret, smsRegion });

  try {
    await sinch.sms.groups.delete({
      group_id: groupId,
    });
    console.log('✅ Successfully deleted the SMS group.');
  } catch (err) {
    console.error(`❌ Failed to delete the SMS group with ID ${groupId}:`);
    console.error(err);
  }
}

main();
