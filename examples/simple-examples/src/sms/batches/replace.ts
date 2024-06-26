import {
  getBatchIdFromConfig, getPhoneNumberFromConfig,
  getPrintFormat,
  getRecipientPhoneNumberFromConfig,
  initSmsServiceWithServicePlanId,
  printFullResponse,
} from '../../config';
import { Sms, textToHex } from '@sinch/sdk-core';

(async () => {
  console.log('****************');
  console.log('* ReplaceBatch *');
  console.log('****************');

  const batchIdInTheFuture = getBatchIdFromConfig();
  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();
  const senderPhoneNumber = getPhoneNumberFromConfig();

  const requestData: Sms.ReplaceBatchMessageRequestData= {
    batch_id: batchIdInTheFuture,
    replaceBatchMessageRequestBody: {
      from: senderPhoneNumber,
      to: [
        recipientPhoneNumber,
      ],
      udh: textToHex('UserDataHeader'),
      body: btoa('This is an replaced message'),
      delivery_report: 'none',
      type: 'mt_binary',
      client_reference: 'Sinch Node.js SDK',
    } as Sms.BinaryRequest,
  };

  const smsService = initSmsServiceWithServicePlanId();
  let response;
  try {
    response = await smsService.batches.replace(requestData);
  } catch (error) {
    console.error(`ERROR: The batch could not be updated`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The batch has been updated successfully. Here is the batch id: ${response.id}`);
  } else {
    printFullResponse(response);
  }
})();
