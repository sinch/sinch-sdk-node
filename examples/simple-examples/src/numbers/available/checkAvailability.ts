import { getPhoneNumberFromConfig, getPrintFormat, initClient, printFullResponse } from '../../config';
import { GetAvailableNumberRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('************************************');
  console.log('* NumberService_GetAvailableNumber *');
  console.log('************************************');

  // Use the phone number from the .env file
  const phoneNumber = getPhoneNumberFromConfig();
  if (!phoneNumber) {
    throw new Error('No phone number has been provided. '
      + 'Please update your .env file or edit the ./src/numbers/available/checkAvailability.ts file');
  }

  const requestData: GetAvailableNumberRequestData= {
    phoneNumber,
  };

  const sinchClient = initClient();
  let response;
  try {
    response = await sinchClient.numbers.availableNumber.checkAvailability(requestData);
  } catch (error) {
    console.error(`ERROR: the phone number ${requestData.phoneNumber} is not available`);
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    const prettyResponse = response?.phoneNumber;
    console.log(prettyResponse);
  } else {
    printFullResponse(response);
  }
})();
