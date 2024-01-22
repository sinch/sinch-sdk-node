import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  getRecipientPhoneNumberFromConfig, getVoiceCallBackUrl,
  initApplicationClient,
  printFullResponse,
} from '../../config';
import { AceResponse, CustomCalloutRequestData, IceResponse } from '@sinch/sdk-core';

(async () => {
  console.log('*********************');
  console.log('* Callouts - Custom *');
  console.log('*********************');

  const callingNumber = getPhoneNumberFromConfig();
  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();
  const callbackUrl = getVoiceCallBackUrl();

  const requestData: CustomCalloutRequestData = {
    customCalloutRequestBody: {
      method: 'customCallout',
      customCallout: {
        cli: callingNumber,
        destination: {
          type: 'number',
          endpoint: recipientPhoneNumber,
        },
        custom: 'Custom text',
        ice: JSON.stringify({
          action: {
            name: 'connectPstn',
            number: recipientPhoneNumber,
            cli: callingNumber,
          },
        } as IceResponse),
        ace: JSON.stringify({
          action: {
            name: 'runMenu',
            locale: 'Kimberly',
            enableVoice: true,
            menus: [
              {
                id: 'main',
                mainPrompt: '#tts[Welcome to the main menu. Press 1 to confirm order or 4 to cancel]',
                repeatPrompt: '#tts[Incorrect value, please try again]',
                timeoutMills: 5000,
                options: [
                  {
                    dtmf: '1',
                    action: 'menu(confirm)',
                  },
                  {
                    dtmf: '4',
                    action: 'return(cancel)',
                  },
                ],
              },
              {
                id: 'confirm',
                mainPrompt: '#tts[Thank you for confirming your order. Enter your 4-digit PIN.]',
                maxDigits: 4,
              },
            ],
          },
        } as AceResponse),
        pie: callbackUrl,
      },
    },
  };

  const sinchClient = initApplicationClient();
  let response;
  try {
    response = await sinchClient.voice.callouts.custom(requestData);
  } catch (error) {
    console.log(`Impossible to make a Custom callout to '${requestData.customCalloutRequestBody?.customCallout.destination?.endpoint}'`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The Custom callout was successful. Id = ${response.callId}`);
  } else {
    printFullResponse(response);
  }
})();
