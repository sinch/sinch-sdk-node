import { getBatchIdFromConfig, getPrintFormat, initSmsClient, printFullResponse } from '../../config';
import { CancelBatchMessageRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('**********************');
  console.log('* CancelBatchMessage *');
  console.log('**********************');

  const batchIdInTheFuture = getBatchIdFromConfig();
  if (!batchIdInTheFuture) {
    throw new Error('No batch id has been provided. '
      + 'Please update your .env file or edit the ./src/sms/batches/cancel.ts file');
  }

  const requestData: CancelBatchMessageRequestData= {
    batch_id: batchIdInTheFuture,
  };

  const sinchClient = initSmsClient();
  let response;
  try {
    response = await sinchClient.sms.batches.cancel(requestData);
  } catch (error) {
    console.error(`ERROR: The batch could not be canceled`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The batch has been canceled successfully. Here is the boolean 'canceled': ${response.canceled}`);
  } else {
    printFullResponse(response);
  }
})();
