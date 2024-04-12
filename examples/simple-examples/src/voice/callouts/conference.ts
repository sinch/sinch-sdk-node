import {
  getConferenceIdFromConfig, getPhoneNumberFromConfig,
  getPrintFormat,
  getRecipientPhoneNumberFromConfig,
  initVoiceService,
  printFullResponse,
} from '../../config';
import { Voice, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('*************************');
  console.log('* Callouts - Conference *');
  console.log('*************************');

  const callingNumber = getPhoneNumberFromConfig();
  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();
  const conferenceId = getConferenceIdFromConfig();

  const requestData: Voice.ConferenceCalloutRequestData = {
    conferenceCalloutRequestBody: {
      method: 'conferenceCallout',
      conferenceCallout: {
        conferenceId,
        cli: callingNumber,
        destination: {
          type: 'number',
          endpoint: recipientPhoneNumber,
        },
        locale: 'en-US',
      },
    },
  };

  const voiceService = initVoiceService();
  voiceService.setRegion(VoiceRegion.EUROPE);
  let response;
  try {
    response = await voiceService.callouts.conference(requestData);
  } catch (error) {
    console.log(`Impossible to make a Conference callout to '${requestData.conferenceCalloutRequestBody?.conferenceCallout.destination.endpoint}'`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The Conference callout was successful. Id = ${response.callId}`);
  } else {
    printFullResponse(response);
  }
})();
