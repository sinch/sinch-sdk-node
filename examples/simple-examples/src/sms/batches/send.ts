import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  getRecipientPhoneNumberFromConfig,
  initSmsClient,
  printFullResponse,
} from '../../config';
import { SendSMSRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('***********');
  console.log('* SendSMS *');
  console.log('***********');

  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();
  const senderPhoneNumber = getPhoneNumberFromConfig();

  const oneDayLater = new Date();
  oneDayLater.setDate(oneDayLater.getDate() +1);

  const requestData: SendSMSRequestData= {
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
      // send_at: oneDayLater,
      delivery_report: 'full',
    },
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
    if(response.type === 'mt_text') {
      console.log(`The message was: '${response.body}'`);
    }
    if(response.type === 'mt_binary') {
      console.log(`The message (decoded) was: '${atob(response.body!)}'`);
    }
    if(response.type === 'mt_media') {
      console.log(`The message was: '${response.body?.message}'`);
    }
  } else {
    printFullResponse(response);
  }
  console.log(`You may want to update your .env file with the following value: BATCH_ID=${response.id}`);
})();
