import {
  getBatchIdFromConfig,
  getPrintFormat,
  getRecipientPhoneNumberFromConfig,
  initSmsClient,
  printFullResponse,
} from '../../config';
import { GetDeliveryReportByPhoneNumberRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('**********************************');
  console.log('* GetDeliveryReportByPhoneNumber *');
  console.log('**********************************');

  const batchId = getBatchIdFromConfig();
  if (!batchId) {
    throw new Error('No batch id has been provided. '
      + 'Please update your .env file or edit the ./src/sms/delivery-reports/getByPhoneNumber.ts file');
  }

  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();
  if (!recipientPhoneNumber) {
    throw new Error('No recipient phone number has been provided. '
      + 'Please update your .env file or edit the ./src/sms/delivery-reports/getByPhoneNumber.ts file');
  }

  const requestData: GetDeliveryReportByPhoneNumberRequestData = {
    batch_id: batchId,
    recipient_msisdn: recipientPhoneNumber,
  };

  const sinchClient = initSmsClient();
  let response;
  try {
    response = await sinchClient.sms.deliveryReports.getByPhoneNumber(requestData);
  } catch (error) {
    console.error(`ERROR: Impossible to retrieve the delivery report by batch ID ${requestData.batch_id} for the recipient ${requestData.recipient_msisdn}`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Delivery report from batch ID ${response.batch_id} and recipient ${response.recipient} - Type: ${response.type} - Status: ${response.code} - ${response.status}`);
  } else {
    printFullResponse(response);
  }
})();
