/**
 * Sinch Node.js Snippet
 * See: https://github.com/sinch/sinch-sdk-node/docs/snippets
 */
import { SinchClient } from '@sinch/sdk-core';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const applicationKey = process.env.SINCH_APPLICATION_KEY ?? 'MY_APPLICATION_KEY';
  const applicationSecret = process.env.SINCH_APPLICATION_SECRET ?? 'MY_APPLICATION_SECRET';

  // The ID of the conference to remove a participant from
  const conferenceId = 'CONFERENCE_ID';
  // The Call ID of the participant to remove from the conference
  const callId = 'PARTICIPANT_CALL_ID';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    await sinch.voice.conferences.kickParticipant({
      conferenceId,
      callId,
    });
    console.log(`✅ Successfully kicked participant with Call ID ${callId} from conference with ID ${conferenceId}.`);
  } catch (err) {
    console.error(`❌ Failed to kick participant with Call ID ${callId} from conference with ID ${conferenceId}:`);
    console.error(err);
  }
}

main();
