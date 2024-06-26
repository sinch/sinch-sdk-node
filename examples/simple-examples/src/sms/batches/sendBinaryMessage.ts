import { Sms, textToHex } from '@sinch/sdk-core';
import {
  getPhoneNumberFromConfig,
  getPrintFormat,
  getRecipientPhoneNumberFromConfig,
  initSmsServiceWithServicePlanId,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('**************');
  console.log('* SendBinary *');
  console.log('**************');

  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();
  const senderPhoneNumber = getPhoneNumberFromConfig();

  const requestData: Sms.SendBinarySMSRequestData = {
    sendSMSRequestBody: {
      type: 'mt_binary',
      to: [
        recipientPhoneNumber,
      ],
      from: senderPhoneNumber,
      body: 'SGVsbG8sIHRoaXMgaXMgYSBTTVMgZnJvbSBTaW5jaA==',
      udh: textToHex('UserDataHeader'),
      delivery_report: 'full',
    },
  };

  const smsService = initSmsServiceWithServicePlanId();
  const response = await smsService.batches.sendBinaryMessage(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The SMS has been sent successfully. Here is the batch id: ${response.id}\nThe message (decoded) was: '${atob(response.body!)}'`);
  } else {
    printFullResponse(response);
  }
  console.log(`You may want to update your .env file with the following value: BATCH_ID=${response.id}`);
})();
