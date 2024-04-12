import {
  getInboundIdFromConfig,
  getPrintFormat,
  initSmsServiceWithServicePlanId,
  printFullResponse,
} from '../../config';
import { Sms } from '@sinch/sdk-core';

(async () => {
  console.log('**************************');
  console.log('* RetrieveInboundMessage *');
  console.log('**************************');

  const inboundId = getInboundIdFromConfig();

  const requestData: Sms.GetInboundMessageRequestData = {
    inbound_id: inboundId,
  };

  const smsService = initSmsServiceWithServicePlanId();
  let response;
  try {
    response = await smsService.inbounds.get(requestData);
  } catch (error) {
    console.error(`ERROR: Impossible to retrieve the inbound message ${requestData.inbound_id}`);
    throw error;
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`Incoming message ID: ${response.id} - Type: ${response.type} - From: ${response.from}`);
  } else {
    printFullResponse(response);
  }
})();
