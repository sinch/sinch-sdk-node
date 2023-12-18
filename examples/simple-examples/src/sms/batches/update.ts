import {
  getBatchIdFromConfig,
  getPhoneNumberFromConfig,
  getPrintFormat, getRecipientPhoneNumberFromConfig,
  initSmsClient,
  printFullResponse,
} from '../../config';
import { ApiUpdateTextMtMessage, UpdateBatchMessageRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('**********************');
  console.log('* UpdateBatchMessage *');
  console.log('**********************');

  const batchId = getBatchIdFromConfig();
  if (!batchId) {
    throw new Error('No batch id has been provided. '
      + 'Please update your .env file or edit the ./src/sms/batches/update.ts file');
  }

  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();
  if (!recipientPhoneNumber) {
    throw new Error('No recipient phone number has been provided. '
      + 'Please update your .env file or edit the ./src/sms/batches/update.ts file');
  }

  const senderPhoneNumber = getPhoneNumberFromConfig();
  if (!senderPhoneNumber) {
    throw new Error('No sender phone number has been provided. '
      + 'Please update your .env file or edit the ./src/sms/batches/update.ts file');
  }

  const requestData: UpdateBatchMessageRequestData= {
    batch_id: batchId,
    updateBatchMessageRequestBody: {
      from: senderPhoneNumber,
      parameters: {
        name: {
          [recipientPhoneNumber]: 'John',
          default: 'there',
        },
      },
      body: 'Hi ${name}! This is an updated message',
      delivery_report: 'none',
      type: 'mt_text',
    } as ApiUpdateTextMtMessage,
  };

  const sinchClient = initSmsClient();
  let response;
  try {
    response = await sinchClient.sms.batches.update(requestData);
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
