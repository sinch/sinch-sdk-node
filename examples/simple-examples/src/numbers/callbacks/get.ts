import { GetCallbackConfigurationRequestData } from '@sinch/sdk-core';
import { getPrintFormat, initNumbersService, printFullResponse } from '../../config';

(async () => {
  console.log('****************************');
  console.log('* GetCallbackConfiguration *');
  console.log('****************************');

  const requestData: GetCallbackConfigurationRequestData = {};

  const numbersService = initNumbersService();
  const response = await numbersService.callbacks.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    const prettyResponse = response.hmacSecret;
    console.log(JSON.stringify(prettyResponse, null, 2));
  } else {
    printFullResponse(response);
  }
})();
