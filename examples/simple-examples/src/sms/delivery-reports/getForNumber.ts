import {
  getBatchIdFromConfig,
  getPrintFormat,
  getRecipientPhoneNumberFromConfig,
  initSmsServiceWithServicePlanId,
  printFullResponse,
} from '../../config';
import { Sms } from '@sinch/sdk-core';

(async () => {
  console.log('**********************************');
  console.log('* GetDeliveryReportByPhoneNumber *');
  console.log('**********************************');

  const batchId = getBatchIdFromConfig();
  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();

  const requestData: Sms.GetDeliveryReportByPhoneNumberRequestData = {
    batch_id: batchId,
    recipient_msisdn: recipientPhoneNumber,
  };

  const smsService = initSmsServiceWithServicePlanId();
  let response;
  try {
    response = await smsService.deliveryReports.getForNumber(requestData);
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
