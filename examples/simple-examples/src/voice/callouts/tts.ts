import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  getRecipientPhoneNumberFromConfig,
  initVoiceService,
  printFullResponse,
} from '../../config';
import { TtsCalloutRequestData, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('******************');
  console.log('* Callouts - TTS *');
  console.log('******************');

  const callingNumber = getPhoneNumberFromConfig();
  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();

  const requestData: TtsCalloutRequestData = {
    ttsCalloutRequestBody: {
      method: 'ttsCallout',
      ttsCallout: {
        cli: callingNumber,
        destination: {
          type: 'number',
          endpoint: recipientPhoneNumber,
        },
        locale: 'en-US/male',
        text: 'Hello, this is a call from Sinch',
      },
    },
  };

  const voiceService = initVoiceService();
  voiceService.setRegion(VoiceRegion.EUROPE);
  let response;
  try {
    response = await voiceService.callouts.tts(requestData);
  } catch (error) {
    console.log(`Impossible to make a TTS callout to '${requestData.ttsCalloutRequestBody?.ttsCallout.destination.endpoint}'`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The TTS callout was successful. Id = ${response.callId}`);
  } else {
    printFullResponse(response);
  }
})();
