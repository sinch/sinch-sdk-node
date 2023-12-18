import { getPrintFormat, getBatchIdFromConfig, initSmsClient, printFullResponse } from '../../config';
import { GetBatchMessageRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('*******************');
  console.log('* GetBatchMessage *');
  console.log('*******************');

  const batchId = getBatchIdFromConfig();
  if (!batchId) {
    throw new Error('No batch id has been provided. '
      + 'Please update your .env file or edit the ./src/sms/batches/get.ts file');
  }

  const requestData: GetBatchMessageRequestData= {
    batch_id: batchId,
  };

  const sinchClient = initSmsClient();
  let response;
  try {
    response = await sinchClient.sms.batches.get(requestData);
  } catch (error) {
    console.error(`ERROR: Impossible to retrieve the batch ${requestData.batch_id}`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Batch ID: ${response.id} - Type: ${response.type} - From: ${response.from}`);
  } else {
    printFullResponse(response);
  }
})();
