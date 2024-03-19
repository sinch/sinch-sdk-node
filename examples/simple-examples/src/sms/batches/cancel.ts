import {
  getBatchIdFromConfig,
  getPrintFormat,
  initSmsServiceWithServicePlanId,
  printFullResponse,
} from '../../config';
import { CancelBatchMessageRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('**********************');
  console.log('* CancelBatchMessage *');
  console.log('**********************');

  const batchIdInTheFuture = getBatchIdFromConfig();

  const requestData: CancelBatchMessageRequestData= {
    batch_id: batchIdInTheFuture,
  };

  const smsService = initSmsServiceWithServicePlanId();
  let response;
  try {
    response = await smsService.batches.cancel(requestData);
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
