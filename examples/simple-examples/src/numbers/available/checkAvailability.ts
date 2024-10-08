import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  initNumbersService,
  printFullResponse,
} from '../../config';
import { Numbers } from '@sinch/sdk-core';

(async () => {
  console.log('************************************');
  console.log('* NumberService_GetAvailableNumber *');
  console.log('************************************');

  // Use the phone number from the .env file
  const phoneNumber = getPhoneNumberFromConfig();

  const requestData: Numbers.GetAvailableNumberRequestData= {
    phoneNumber,
  };

  const numbersService = initNumbersService();
  let response;
  try {
    response = await numbersService.checkAvailability(requestData);
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
