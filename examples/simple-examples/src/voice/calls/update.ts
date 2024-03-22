import {
  getCallIdFromConfig,
  initVoiceService,
} from '../../config';
import { UpdateCallRequestData, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('**************');
  console.log('* UpdateCall *');
  console.log('**************');

  const callId = getCallIdFromConfig();

  const requestData: UpdateCallRequestData = {
    callId,
    updateCallRequestBody: {
      instructions: [
        {
          name: 'sendDtmf',
          value: '1234#',
        },
        {
          name: 'startRecording',
          options: {
            destinationUrl: 's3://sinch-storage/voice-recordings/my-recording.mp3',
            credentials: '(AwsAccessKey):(AwsSecretKey):(AwsRegion)',
            notificationEvents: true,
            transcriptionOptions: {
              enabled: true,
              locale: 'en-US',
            },
          },
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
    await voiceService.calls.update(requestData);
  } catch (error) {
    console.log(`Impossible update the call Id '${requestData.callId}'`);
    throw error;
  }

  console.log(`The call '${requestData.callId}' has been updated successfully`);

})();
