import { getPrintFormat, initNumbersService, printFullResponse } from '../../config';
import { ListAvailableNumbersRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('**************************************');
  console.log('* NumberService_ListAvailableNumbers *');
  console.log('**************************************');

  const requestData: ListAvailableNumbersRequestData= {
    regionCode: 'US',
    type: 'LOCAL',
    capabilities: ['SMS', 'VOICE'],
  };

  const numbersService = initNumbersService();
  const response = await numbersService.availableNumber.list(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(response.availableNumbers
      ? JSON.stringify(response.availableNumbers.map((availableNumber) => availableNumber.phoneNumber))
      : 'Sorry, no numbers are available.');
  } else {
    printFullResponse(response);
  }
})();
