import { getPrintFormat, initNumbersService, printFullResponse } from '../../config';
import { Numbers } from '@sinch/sdk-core';

(async () => {
  console.log('**************************************');
  console.log('* NumberService_ListAvailableNumbers *');
  console.log('**************************************');

  const requestData: Numbers.ListAvailableNumbersRequestData= {
    regionCode: 'US',
    type: 'LOCAL',
    capabilities: ['SMS', 'VOICE'],
  };

  const numbersService = initNumbersService();
  const response = await numbersService.searchForAvailableNumbers(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(response.availableNumbers
      ? JSON.stringify(response.availableNumbers.map((availableNumber) => availableNumber.phoneNumber))
      : 'Sorry, no numbers are available.');
  } else {
    printFullResponse(response);
  }
})();
