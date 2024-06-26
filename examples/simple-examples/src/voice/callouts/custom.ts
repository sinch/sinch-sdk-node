import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  getRecipientPhoneNumberFromConfig,
  getVoiceCallBackUrl,
  initVoiceService,
  printFullResponse,
} from '../../config';
import { Voice } from '@sinch/sdk-core';

(async () => {
  console.log('*********************');
  console.log('* Callouts - Custom *');
  console.log('*********************');

  const callingNumber = getPhoneNumberFromConfig();
  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();
  const callbackUrl = getVoiceCallBackUrl();

  const requestData: Voice.CustomCalloutRequestData = {
    customCalloutRequestBody: {
      method: 'customCallout',
      customCallout: {
        cli: callingNumber,
        destination: {
          type: 'number',
          endpoint: recipientPhoneNumber,
        },
        custom: 'Custom text',
        ice: Voice.customCalloutHelper.formatIceResponse(
          Voice.iceActionHelper.connectPstn({
            number: recipientPhoneNumber,
            cli: callingNumber,
          }),
          Voice.iceInstructionHelper.say('Welcome to Sinch.', 'en-US/male'),
          Voice.iceInstructionHelper.startRecording({
            destinationUrl: 'To specify',
            credentials: 'To specify',
          }),
        ),
        ace: Voice.customCalloutHelper.formatAceResponse(
          Voice.aceActionHelper.runMenu({
            locale: 'Kimberly',
            enableVoice: true,
            barge: true,
            menus: [
              {
                id: 'main',
                mainPrompt: '#tts[Welcome to the main menu. Press 1 to confirm order or 2 to cancel]',
                repeatPrompt: '#tts[We didn\'t get your input, please try again]',
                timeoutMills: 5000,
                options: [
                  {
                    dtmf: '1',
                    action: 'menu(confirm)',
                  },
                  {
                    dtmf: '2',
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
          }),
        ),
        pie: callbackUrl,
      },
    },
  };

  const voiceService = initVoiceService();
  let response;
  try {
    response = await voiceService.callouts.custom(requestData);
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
