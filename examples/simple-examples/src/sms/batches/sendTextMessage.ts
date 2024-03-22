import { SendTextSMSRequestData } from '@sinch/sdk-core';
import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  getRecipientPhoneNumberFromConfig,
  initSmsClient,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('*******************');
  console.log('* SendTextMessage *');
  console.log('*******************');

  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();
  const senderPhoneNumber = getPhoneNumberFromConfig();

  const requestData: SendTextSMSRequestData = {
    sendSMSRequestBody: {
      type: 'mt_text',
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
      delivery_report: 'full',
    },
  };

  const sinchClient = initSmsClient();
  const response = await sinchClient.sms.batches.sendTextMessage(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The SMS has been sent successfully. Here is the batch id: ${response.id}\nThe message was: '${response.body}'`);
  } else {
    printFullResponse(response);
  }
  console.log(`You may want to update your .env file with the following value: BATCH_ID=${response.id}`);
})();
