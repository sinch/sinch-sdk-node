import { getPhoneNumberFromConfig, getPrintFormat, initClient, printFullResponse } from '../../config';
import { GetActiveNumberRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('*********************************');
  console.log('* NumberService_GetActiveNumber *');
  console.log('*********************************');

  const phoneNumber = getPhoneNumberFromConfig();
  if (!phoneNumber) {
    throw new Error('No phone number has been provided. '
      + 'Please update your .env file or edit the ./src/numbers/active/get.ts file');
  }

  const requestData: GetActiveNumberRequestData= {
    phoneNumber,
  };

  const sinchClient = initClient();
  let response;
  try {
    response = await sinchClient.numbers.activeNumber.get(requestData);
  } catch (error) {
    console.error(`ERROR: The phone number ${requestData.phoneNumber} is not active`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The phone number ${response.phoneNumber} is part of your active numbers.\n Display name = ${response.displayName}`);
  } else {
    printFullResponse(response);
  }
})();
