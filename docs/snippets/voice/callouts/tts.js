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

  // The phone number you want to call, in E.164 format (e.g., +12025550123)
  const recipientPhoneNumber = 'RECIPIENT_PHONE_NUMBER';
  // The text you want to convert to speech and play during the call
  const textToSpeech = 'Hello, this is a call initiated from the Sinch Node.js SDK. Goodbye.';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  try {
    const response = await sinch.voice.callouts.tts({
      ttsCalloutRequestBody: {
        method: 'ttsCallout',
        ttsCallout: {
          destination: {
            type: 'number',
            endpoint: recipientPhoneNumber,
          },
          text: textToSpeech,
        },
      },
    });
    console.log(`✅ Successfully initiated TTS call to ${recipientPhoneNumber}:`);
    console.log(JSON.stringify(response, null, 2));
  } catch (err) {
    console.error(`❌ Failed to initiate TTS call to ${recipientPhoneNumber}:`);
    console.error(err);
  }
}

main();
