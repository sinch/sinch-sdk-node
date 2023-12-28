import {
  getCallIdFromConfig,
  initApplicationClient,
} from '../../config';
import { UpdateCallRequestData, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('**************');
  console.log('* UpdateCall *');
  console.log('**************');

  const requestData: UpdateCallRequestData = {
    callId: getCallIdFromConfig(),
    svamlRequestBody: {
      instructions: [
        {
          name: 'sendDtmf',
          value: '1234#',
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
    await sinchClient.voice.calls.update(requestData);
  } catch (error) {
    console.log(`Impossible update the call Id '${requestData.callId}'`);
    throw error;
  }

  console.log(`The call '${requestData.callId}' has been updated successfully`);

})();
