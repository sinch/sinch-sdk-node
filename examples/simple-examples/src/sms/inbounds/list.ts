import {
  getPrintFormat,
  getRecipientPhoneNumberFromConfig,
  initSmsServiceWithServicePlanId,
  printFullResponse,
} from '../../config';
import {
  Sms,
  PageResult,
} from '@sinch/sdk-core';

const populateInboundMessagesList = (
  inboundMessagesListPage: PageResult<Sms.InboundMessageResponse>,
  fullInboundMessagesList: Sms.InboundMessageResponse[],
  inboundMessagesList: string[],
) => {
  fullInboundMessagesList.push(...inboundMessagesListPage.data);
  inboundMessagesListPage.data.map((inboundMessage) => {
    inboundMessagesList.push(`Inbound message ID: ${inboundMessage.id} - Type: ${inboundMessage.type} - From: ${inboundMessage.from}`);
  });
};

(async () => {
  console.log('***********************');
  console.log('* ListInboundMessages *');
  console.log('***********************');

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  oneWeekAgo.setHours(0, 0, 0, 0);
  const recipientPhoneNumber = getRecipientPhoneNumberFromConfig();

  const requestData: Sms.ListInboundMessagesRequestData= {
    start_date: oneWeekAgo,
    to: recipientPhoneNumber,
  };

  const smsService = initSmsServiceWithServicePlanId();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response;
  try {
    response = await smsService.inbounds.list(requestData);
  } catch (error) {
    console.error(`ERROR: Impossible to get the list the inbound messages for the numbers ${requestData.to}`);
    throw error;
  }

  const fullInboundMessagesList: Sms.InboundMessageResponse[] = [];
  const inboundMessagesList: string[] = [];

  // Loop on all the pages to get all the batches
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateInboundMessagesList(response, fullInboundMessagesList, inboundMessagesList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(inboundMessagesList.length > 0
      ? 'List of inbound messages: ' + JSON.stringify(inboundMessagesList, null, 2)
      : 'Sorry, no inbound messages were found.');
  } else {
    printFullResponse(fullInboundMessagesList);
  }

  if (fullInboundMessagesList.length > 0) {
    console.log(`You may want to update your .env file with the following value: INBOUND_ID=${fullInboundMessagesList[0].id}`);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const inboundMessage of smsService.inbounds.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`Inbound message ID: ${inboundMessage.id} - Type: ${inboundMessage.type} - From: ${inboundMessage.from}`);
    } else {
      console.log(inboundMessage);
    }
  }

})();
