import {
  getInboundIdFromConfig,
  getPrintFormat,
  initSmsClient,
  printFullResponse,
} from '../../config';
import { GetInboundMessageRequestData } from '@sinch/sdk-core';

(async () => {
  console.log('**************************');
  console.log('* RetrieveInboundMessage *');
  console.log('**************************');

  const inboundId = getInboundIdFromConfig();

  const requestData: GetInboundMessageRequestData = {
    inbound_id: inboundId,
  };

  const sinchClient = initSmsClient();
  let response;
  try {
    response = await sinchClient.sms.inbounds.get(requestData);
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
