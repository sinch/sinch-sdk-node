import {
  getApplicationKeyFromConfig,
  getPhoneNumberFromConfig,
  initVoiceService,
} from '../../config';
import { AssignNumbersRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('*****************');
  console.log('* UpdateNumbers *');
  console.log('*****************');

  const phoneNumber = getPhoneNumberFromConfig();
  const applicationKey = getApplicationKeyFromConfig();

  const requestData: AssignNumbersRequestData = {
    assignNumbersRequestBody: {
      numbers: [phoneNumber],
      applicationkey: applicationKey,
      capability: 'voice',
    },
  };

  const voiceService = initVoiceService();
  try {
    await voiceService.applications.assignNumbers(requestData);
  } catch (error) {
    console.log(`Impossible to assign the numbers '${requestData.assignNumbersRequestBody?.numbers}' to the application '${requestData.assignNumbersRequestBody?.applicationkey}'`);
    throw error;
  }

  console.log(`The numbers '${requestData.assignNumbersRequestBody?.numbers}' have been assigned to the application '${requestData.assignNumbersRequestBody?.applicationkey}' successfully`);
})();
