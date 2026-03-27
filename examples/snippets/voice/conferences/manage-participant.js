/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/examples/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const applicationKey = process.env.SINCH_APPLICATION_KEY ?? 'MY_APPLICATION_KEY';
  const applicationSecret = process.env.SINCH_APPLICATION_SECRET ?? 'MY_APPLICATION_SECRET';

  // The ID of the conference to manage a participant in
  const conferenceId = 'CONFERENCE_ID';
  // The Call ID of the participant to manage in the conference
  const callId = 'PARTICIPANT_CALL_ID';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    await sinch.voice.conferences.manageParticipant({
      conferenceId,
      callId,
      manageParticipantRequestBody: {
        command: 'onhold',
        moh: 'music1',
      },
    });
    console.log(`✅ Successfully managed participant with Call ID ${callId} in conference with ID ${conferenceId}.`);
  } catch (err) {
    console.error(`❌ Failed to manage participant with Call ID ${callId} in conference with ID ${conferenceId}:`);
    console.error(err);
  }
}

main();
