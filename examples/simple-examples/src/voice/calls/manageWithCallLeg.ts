import {
  getCallIdFromConfig,
  initVoiceService,
} from '../../config';
import { Voice, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('*************************');
  console.log('* ManageCallWithCallLeg *');
  console.log('*************************');

  const callId = getCallIdFromConfig();

  const requestData: Voice.ManageWithCallLegRequestData = {
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
  };

  const voiceService = initVoiceService();
  voiceService.setRegion(VoiceRegion.EUROPE);
  try {
    await voiceService.calls.manageWithCallLeg(requestData);
  } catch (error) {
    console.log(`Impossible manage with call leg the call Id ${requestData.callId}`);
    throw error;
  }

  console.log(`The call '${requestData.callId}' has been managed successfully with a call leg`);

})();
