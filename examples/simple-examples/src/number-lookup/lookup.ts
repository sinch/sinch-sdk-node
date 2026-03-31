import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  printFullResponse,
  initNumberLookupService,
} from '../config';
import { NumberLookup } from '@sinch/sdk-core';

(async () => {
  console.log('****************');
  console.log('* numberLookup *');
  console.log('****************');

  // Replace with any phone number you want to retrieve information about
  const phoneNumber = getPhoneNumberFromConfig();

  const requestData: NumberLookup.NumberLookupRequestData = {
    numberLookupRequestBody: {
      number: phoneNumber,
    },
  };

  const numberLookupService = initNumberLookupService();
  const response = await numberLookupService.lookup(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The phone number ${response.number} is of type '${response.line?.type}'`);
  } else {
    printFullResponse(response);
  }
})();
