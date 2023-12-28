import {
  getCallIdFromConfig,
  initApplicationClient,
} from '../../config';
import { ManageWithCallLegRequestData, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('*************************');
  console.log('* ManageCallWithCallLeg *');
  console.log('*************************');

  const requestData: ManageWithCallLegRequestData = {
    callId: getCallIdFromConfig(),
    callLeg: 'callee',
    svamlRequestBody: {
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
  };

  const sinchClient = initApplicationClient();
  sinchClient.voice.setRegion(VoiceRegion.EUROPE);
  try {
    await sinchClient.voice.calls.manageWithCallLeg(requestData);
  } catch (error) {
    console.log(`Impossible manage with call leg the call Id ${requestData.callId}`);
    throw error;
  }

  console.log(`The call '${requestData.callId}' has been managed successfully with a call leg`);

})();
