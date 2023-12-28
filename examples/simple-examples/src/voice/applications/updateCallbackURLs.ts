import {
  getApplicationKeyFromConfig,
  initApplicationClient,
} from '../../config';
import { UpdateCallbackURLsRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('**********************');
  console.log('* UpdateCallbackURLs *');
  console.log('**********************');

  const requestData: UpdateCallbackURLsRequestData = {
    applicationkey: getApplicationKeyFromConfig(),
    updateCallbacksRequestBody: {
      url: {
        primary: 'https://new-primary-callback-url.com',
        fallback: 'https://new-fallback-callback-url.com',
      },
    },
  };

  const sinchClient = initApplicationClient();
  try {
    await sinchClient.voice.applications.updateCallbackURLs(requestData);
  } catch (error) {
    console.log(`Impossible to update the callback URLs for the application '${requestData.applicationkey}'`);
    throw error;
  }

  console.log(`The callback URLS of the application '${requestData.applicationkey}' have been updated successfully`);

})();
