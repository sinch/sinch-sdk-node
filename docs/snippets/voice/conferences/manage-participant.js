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

  const conferenceId = 'AN_EXISTING_CONFERENCE_ID';
  const callId = 'A_PARTICIPANT_CALL_ID';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  await sinch.voice.conferences.manageParticipant({
    conferenceId,
    callId,
    manageParticipantRequestBody: {
      command: 'onhold',
      moh: 'music1',
    },
  });

  console.log('Done');
})();
