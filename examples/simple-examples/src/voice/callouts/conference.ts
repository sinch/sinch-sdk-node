import {
  getConferenceIdFromConfig, getPhoneNumberFromConfig,
  getPrintFormat,
  getRecipientPhoneNumberFromConfig,
  initApplicationClient,
  printFullResponse,
} from '../../config';
import { ConferenceCalloutRequestData, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('*************************');
  console.log('* Callouts - Conference *');
  console.log('*************************');

  const callingNumber = getPhoneNumberFromConfig();
  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();
  const conferenceId = getConferenceIdFromConfig();

  const requestData: ConferenceCalloutRequestData = {
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

  const sinchClient = initApplicationClient();
  sinchClient.voice.setRegion(VoiceRegion.EUROPE);
  let response;
  try {
    response = await sinchClient.voice.callouts.conference(requestData);
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
