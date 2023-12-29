import { getApplicationKeyFromConfig, getPhoneNumberFromConfig, initApplicationClient } from '../../config';
import { UnassignNumberRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('******************');
  console.log('* UnassignNumber *');
  console.log('******************');

  const phoneNumber = getPhoneNumberFromConfig();
  const applicationKey = getApplicationKeyFromConfig();

  const requestData: UnassignNumberRequestData = {
    unassignNumbersRequestBody: {
      number: phoneNumber,
      applicationkey: applicationKey,
      capability: 'voice',
    },
  };

  const sinchClient = initApplicationClient();
  try {
    await sinchClient.voice.applications.unassignNumber(requestData);
  } catch (error) {
    console.log(`Impossible to unassign the number '${requestData.unassignNumbersRequestBody?.number}' from the application '${requestData.unassignNumbersRequestBody?.applicationkey}'`);
    throw error;
  }

  console.log(`The number '${requestData.unassignNumbersRequestBody?.number}' has been unassigned from the application '${requestData.unassignNumbersRequestBody?.applicationkey}'`);
})();
