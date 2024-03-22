import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  initNumbersService,
  printFullResponse,
} from '../../config';
import { ReleaseNumberRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('*******************************');
  console.log('* NumberService_ReleaseNumber *');
  console.log('*******************************');

  const phoneNumber = getPhoneNumberFromConfig();

  const requestData: ReleaseNumberRequestData= {
    phoneNumber,
  };

  const numbersService = initNumbersService();
  const response = await numbersService.activeNumber.release(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The phone number ${response.phoneNumber} will be released at ${response.expireAt}`);
  } else {
    printFullResponse(response);
  }
})();
