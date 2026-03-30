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

  // The ID of the conference to retrieve
  const conferenceId = 'CONFERENCE_ID';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    const response = await sinch.voice.conferences.get({ conferenceId });
    console.log('✅ Successfully retrieved conference information.');
    console.log(`Response:\n${JSON.stringify(response, null, 2)}`);
  } catch (err) {
    console.error(`❌ Failed to retrieve information for conference with ID ${conferenceId}:`);
    console.error(err);
  }
}

main();
