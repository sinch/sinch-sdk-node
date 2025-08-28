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
  const smsRegion = process.env.SINCH_SMS_REGION || 'MY_SMS_REGION';

  const groupName = 'Sinch Node.js SDK test group';
  const groupMembers = ['+46701234567', '+46701234568'];

  const sinch = new SinchClient({ projectId, keyId, keySecret, smsRegion });

  const response = await sinch.sms.groups.create({
    createGroupRequestBody: {
      name: groupName,
      members: groupMembers,
    },
  });

  console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
})();
