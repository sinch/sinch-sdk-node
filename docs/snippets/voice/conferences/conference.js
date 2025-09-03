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

  // The phone number to be used as the caller ID (CLI) for the outbound call
  const sinchPhoneNumber = process.env.SINCH_PHONE_NUMBER || 'MY_SINCH_PHONE_NUMBER';
  // An existing or to be created conference ID
  const conferenceId = 'CONFERENCE_ID';
  // The phone number to be called and added to the conference, in E.164 format (e.g., +12025550123)
  const recipientPhoneNumber = 'RECIPIENT_PHONE_NUMBER';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    const response = await sinch.voice.callouts.conference({
      conferenceCalloutRequestBody: {
        method: 'conferenceCallout',
        conferenceCallout: {
          conferenceId,
          cli: sinchPhoneNumber,
          destination: {
            type: 'number',
            endpoint: recipientPhoneNumber,
          },
        },
      },
    });
    console.log(`✅ Successfully initiated conference call to ${recipientPhoneNumber}:`);
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to initiate conference call to ${recipientPhoneNumber}:`);
    console.error(err);
  }
}


main();
