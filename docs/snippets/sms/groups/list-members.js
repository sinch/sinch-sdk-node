/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const projectId = process.env.SINCH_PROJECT_ID ?? 'MY_PROJECT_ID';
  const keyId = process.env.SINCH_KEY_ID ?? 'MY_KEY_ID';
  const keySecret = process.env.SINCH_KEY_SECRET ?? 'MY_KEY_SECRET';
  const smsRegion = process.env.SINCH_SMS_REGION ?? 'MY_SMS_REGION';

  // The ID of the group to list members for
  const groupId = 'GROUP_ID';

  const sinch = new SinchClient({ projectId, keyId, keySecret, smsRegion });

  try {
    const response = await sinch.sms.groups.listMembers({
      group_id: groupId,
    });
    if (response.length === 0) {
      console.log('No group members found.');
      return;
    }
    console.log(`✅ Found ${response.length} members in the SMS group with ID ${groupId}.`);
    response.forEach((groupMember) => {
      console.log(groupMember);
    });
  } catch (err) {
    console.error(`❌ Failed to list members for the group with ID ${groupId}:`);
    console.error(err);
  }
}

main();
