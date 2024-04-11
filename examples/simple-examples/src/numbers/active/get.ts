import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  initNumbersService,
  printFullResponse,
} from '../../config';
import { Numbers } from '@sinch/sdk-core';

(async () => {
  console.log('*********************************');
  console.log('* NumberService_GetActiveNumber *');
  console.log('*********************************');

  const phoneNumber = getPhoneNumberFromConfig();

  const requestData: Numbers.GetActiveNumberRequestData= {
    phoneNumber,
  };

  const numbersService = initNumbersService();
  let response;
  try {
    response = await numbersService.activeNumber.get(requestData);
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
