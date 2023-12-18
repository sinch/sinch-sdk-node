import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  getRecipientPhoneNumberFromConfig,
  initSmsClient,
  printFullResponse,
} from '../../config';
import { SendSMSRequestData, TextRequest } from '@sinch/sdk-core';

(async () => {
  console.log('***********');
  console.log('* SendSMS *');
  console.log('***********');

  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();
  if (!recipientPhoneNumber) {
    throw new Error('No recipient phone number has been provided. '
      + 'Please update your .env file or edit the ./src/sms/batches/send.ts file');
  }

  const senderPhoneNumber = getPhoneNumberFromConfig();
  if (!senderPhoneNumber) {
    throw new Error('No sender phone number has been provided. '
      + 'Please update your .env file or edit the ./src/sms/batches/send.ts file');
  }

  const oneDayLater = new Date();
  oneDayLater.setDate(oneDayLater.getDate() +1);

  const requestData: SendSMSRequestData= {
    sendSMSRequestBody: {
      to: [
        recipientPhoneNumber,
      ],
      from: senderPhoneNumber,
      parameters: {
        name: {
          [recipientPhoneNumber]: 'John',
          default: 'there',
        },
      },
      body: 'Hi ${name}!',
      send_at: oneDayLater,
      delivery_report: 'none',
      type: 'mt_text',
    } as TextRequest,
  };

  const sinchClient = initSmsClient();
  let response;
  try {
    response = await sinchClient.sms.batches.send(requestData);
  } catch (error) {
    console.error(`ERROR: The SMS could not be sent`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The SMS has been sent successfully. Here is the batch id: ${response.id}`);
  } else {
    printFullResponse(response);
  }
  console.log(`You may want to update your .env file with the following value: BATCH_ID=${response.id}`);
})();
