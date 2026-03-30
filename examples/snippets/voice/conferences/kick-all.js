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

  // The ID of the conference to remove all participants from
  const conferenceId = 'CONFERENCE_ID';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    await sinch.voice.conferences.kickAll({ conferenceId });
    console.log(`✅ Successfully kicked all participants from conference with ID ${conferenceId}.`);
  } catch (err) {
    console.error(`❌ Failed to kick all participants from conference with ID ${conferenceId}:`);
    console.error(err);
  }
}

main();
