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

  // The ID of the group to replace members for
  const groupId = 'GROUP_ID';
  // The new members to set for the group
  const membersReplacement = ['+33702345678', '+33702345679'];

  const sinch = new SinchClient({ projectId, keyId, keySecret, smsRegion });

  try {
    const response = await sinch.sms.groups.replace({
      group_id: groupId,
      replaceGroupRequestBody: {
        members: membersReplacement,
      },
    });
    console.log('✅ Successfully replaced members of the SMS group.');
    console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
  } catch (err) {
    console.error(`❌ Failed to replace the members for the group with ID ${groupId}:`);
    console.error(err);
  }
}

main();
