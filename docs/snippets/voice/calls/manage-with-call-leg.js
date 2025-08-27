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

  const callId = 'A_CALL_ID';

  const sinch = new SinchClient({ applicationKey, applicationSecret });

  await sinch.voice.calls.manageWithCallLeg({
    callId,
    callLeg: 'callee',
    manageWithCallLegRequestBody: {
      instructions: [
        {
          name: 'say',
          text: 'Hello, the call is over, hanging up now. Goodbye',
        },
      ],
      action: {
        name: 'hangup',
      },
    },
  });

  console.log('Done');
})();
