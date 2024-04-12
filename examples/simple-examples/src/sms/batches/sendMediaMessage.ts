import { Sms } from '@sinch/sdk-core';
import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  getRecipientPhoneNumberFromConfig,
  initSmsServiceWithServicePlanId,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('********************');
  console.log('* SendMediaMessage *');
  console.log('********************');

  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();
  const senderPhoneNumber = getPhoneNumberFromConfig();

  const requestData: Sms.SendMediaSMSRequestData = {
    sendSMSRequestBody: {
      type: 'mt_media',
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
      body: {
        url: 'https://media.body.url',
        message: 'Text message coming along with the media file',
      },
      delivery_report: 'full',
      strict_validation: true,
    },
  };

  const smsService = initSmsServiceWithServicePlanId();
  const response = await smsService.batches.sendMediaMessage(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The MMS has been sent successfully. Here is the batch id: ${response.id}\nThe message was: '${response.body?.message}'`);
  } else {
    printFullResponse(response);
  }
  console.log(`You may want to update your .env file with the following value: BATCH_ID=${response.id}`);
})();
