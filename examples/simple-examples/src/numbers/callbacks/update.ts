import { UpdateCallbackConfigurationRequestData } from '@sinch/sdk-core';
import {
  getHmacSecretFromConfig,
  getPrintFormat,
  initNumbersService,
  printFullResponse,
} from '../../config';
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

  const numbersService = initNumbersService();
  const response = await numbersService.callbacks.update(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    const prettyResponse = response.hmacSecret;
    console.log(JSON.stringify(prettyResponse, null, 2));
  } else {
    printFullResponse(response);
  }
})();
