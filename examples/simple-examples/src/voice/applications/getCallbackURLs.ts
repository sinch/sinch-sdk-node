import {
  getApplicationKeyFromConfig,
  getPrintFormat,
  initApplicationClient,
  printFullResponse,
} from '../../config';
import { GetCallbackURLsRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('*******************');
  console.log('* GetCallbackURLs *');
  console.log('*******************');

  const requestData: GetCallbackURLsRequestData = {
    applicationkey: getApplicationKeyFromConfig(),
  };

  const sinchClient = initApplicationClient();
  let response;
  try {
    response = await sinchClient.voice.applications.getCallbackURLs(requestData);
  } catch (error) {
    console.log(`Impossible to retrieve the callback URLs for the application '${requestData.applicationkey}'`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The primary callback URL is [${response.url?.primary}]. ${response.url?.fallback ? 'The fallback URL is [' + response.url.fallback + ']' : 'There is no fallback URL'}`);
  } else {
    printFullResponse(response);
  }
})();
