import { UpdateCallbackConfigurationRequestData } from '@sinch/sdk-core';
import { getHmacSecretFromConfig, getPrintFormat, initClient, printFullResponse } from '../../config';
import * as process from 'process';

(async () => {
  console.log('*******************************');
  console.log('* UpdateCallbackConfiguration *');
  console.log('*******************************');

  const hmacSecret = getHmacSecretFromConfig();

  const requestData: UpdateCallbackConfigurationRequestData = {
    callbackConfigurationUpdateRequestBody: {
      hmacSecret,
    },
  };

  const sinchClient = initClient();
  const response = await sinchClient.numbers.callbacks.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    const prettyResponse = response.hmacSecret;
    console.log(JSON.stringify(prettyResponse, null, 2));
  } else {
    printFullResponse(response);
  }
})();
