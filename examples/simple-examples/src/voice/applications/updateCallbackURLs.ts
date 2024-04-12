import {
  getApplicationKeyFromConfig,
  initVoiceService,
} from '../../config';
import { Voice } from '@sinch/sdk-core';

(async () => {
  console.log('**********************');
  console.log('* UpdateCallbackURLs *');
  console.log('**********************');

  const applicationKey = getApplicationKeyFromConfig();

  const requestData: Voice.UpdateCallbackURLsRequestData = {
    applicationkey: applicationKey,
    updateCallbacksRequestBody: {
      url: {
        primary: 'https://new-primary-callback-url.com',
        fallback: 'https://new-fallback-callback-url.com',
      },
    },
  };

  const voiceService = initVoiceService();
  try {
    await voiceService.applications.updateCallbackURLs(requestData);
  } catch (error) {
    console.log(`Impossible to update the callback URLs for the application '${requestData.applicationkey}'`);
    throw error;
  }

  console.log(`The callback URLS of the application '${requestData.applicationkey}' have been updated successfully`);

})();
