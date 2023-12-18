import { getBatchIdFromConfig, getPrintFormat, initSmsClient, printFullResponse } from '../../config';
import { GetDeliveryReportByBatchIdRequestData, MessageDeliveryStatus } from '@sinch/sdk-core';

(async () => {
  console.log('******************************');
  console.log('* GetDeliveryReportByBatchId *');
  console.log('******************************');

  const batchId = getBatchIdFromConfig();
  if (!batchId) {
    throw new Error('No batch id has been provided. '
      + 'Please update your .env file or edit the ./src/sms/delivery-reports/getByBatchId.ts file');
  }

  const requestData: GetDeliveryReportByBatchIdRequestData = {
    batch_id: batchId,
  };

  const sinchClient = initSmsClient();
  let response;
  try {
    response = await sinchClient.sms.deliveryReports.get(requestData);
  } catch (error) {
    console.error(`ERROR: Impossible to retrieve the delivery report by batch ID ${requestData.batch_id}`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    const statuses: string[] = [];
    response.statuses.map((status: MessageDeliveryStatus) => {
      statuses.push(`${status.count} messages have the status ${status.code} - ${status.status}`);
    });
    console.log(`Delivery report from batch ID: ${response.batch_id} - Type: ${response.type} - Statuses: ${statuses}`);
  } else {
    printFullResponse(response);
  }
})();
