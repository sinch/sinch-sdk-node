import { getApplicationKeyFromConfig, getPhoneNumberFromConfig, initApplicationClient } from '../../config';
import { AssignNumbersRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('*****************');
  console.log('* UpdateNumbers *');
  console.log('*****************');

  const requestData: AssignNumbersRequestData = {
    assignNumbersRequestBody: {
      numbers: [getPhoneNumberFromConfig()],
      applicationkey: getApplicationKeyFromConfig(),
      capability: 'voice',
    },
  };

  const sinchClient = initApplicationClient();
  try {
    await sinchClient.voice.applications.assignNumbers(requestData);
  } catch (error) {
    console.log(`Impossible to assign the numbers '${requestData.assignNumbersRequestBody?.numbers}' to the application '${requestData.assignNumbersRequestBody?.applicationkey}'`);
    throw error;
  }

  console.log(`The numbers '${requestData.assignNumbersRequestBody?.numbers}' have been assigned to the application '${requestData.assignNumbersRequestBody?.applicationkey}' successfully`);
})();
