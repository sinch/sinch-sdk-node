import {
  getApplicationKeyFromConfig,
  getPrintFormat,
  initVoiceService,
  printFullResponse,
} from '../../config';
import { Voice } from '@sinch/sdk-core';

(async () => {
  console.log('*******************');
  console.log('* GetCallbackURLs *');
  console.log('*******************');

  const applicationKey = getApplicationKeyFromConfig();

  const requestData: Voice.GetCallbackURLsRequestData = {
    applicationkey: applicationKey,
  };

  const voiceService = initVoiceService();
  let response;
  try {
    response = await voiceService.applications.getCallbackURLs(requestData);
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
