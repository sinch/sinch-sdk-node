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
  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();
  const senderPhoneNumber = getPhoneNumberFromConfig();

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
