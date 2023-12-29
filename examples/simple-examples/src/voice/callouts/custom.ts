import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  getRecipientPhoneNumberFromConfig,
  initApplicationClient,
  printFullResponse,
} from '../../config';
import { CustomCalloutRequestData, VoiceRegion } from '@sinch/sdk-core';

(async () => {
  console.log('*********************');
  console.log('* Callouts - Custom *');
  console.log('*********************');

  const callingNumber = getPhoneNumberFromConfig();
  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();

  const requestData: CustomCalloutRequestData = {
    customCalloutRequestBody: {
      method: 'customCallout',
      customCallout: {
        cli: callingNumber,
        destination: {
          type: 'number',
          endpoint: recipientPhoneNumber,
        },
      },
    },
  };

  const sinchClient = initApplicationClient();
  sinchClient.voice.setRegion(VoiceRegion.EUROPE);
  let response;
  try {
    response = await sinchClient.voice.callouts.custom(requestData);
  } catch (error) {
    console.log(`Impossible to make a Custom callout to '${requestData.customCalloutRequestBody?.customCallout.destination?.endpoint}'`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The Custom callout was successful. Id = ${response.callId}`);
  } else {
    printFullResponse(response);
  }
})();
