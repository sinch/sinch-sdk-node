import { GetCallbackConfigurationRequestData } from '@sinch/sdk-core';
import { getPrintFormat, initClient, printFullResponse } from '../../config';

(async () => {
  console.log('****************************');
  console.log('* GetCallbackConfiguration *');
  console.log('****************************');

  const requestData: GetCallbackConfigurationRequestData = {};

  const sinchClient = initClient();
  const response = await sinchClient.numbers.callbacks.get(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    const prettyResponse = response.hmacSecret;
    console.log(JSON.stringify(prettyResponse, null, 2));
  } else {
    printFullResponse(response);
  }
})();
