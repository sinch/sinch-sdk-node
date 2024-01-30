import { ConversationMessage, ListMessagesRequestData, PageResult } from '@sinch/sdk-core';
import {
  getAppIdFromConfig,
  getContactIdFromConfig, getConversationIdFromConfig,
  getPrintFormat,
  initClient,
  printFullResponse,
} from '../../config';

const populateMessagesList = (
  conversationPage: PageResult<ConversationMessage>,
  conversationList: ConversationMessage[],
  conversationDetailsList: string[],
) => {
  conversationPage.data.map((message: ConversationMessage) => {
    conversationList.push(message);
    conversationDetailsList.push(`${message.id} - ${message.accept_time}`);
  });
};

(async () => {
  console.log('*************************');
  console.log('* Messages_ListMessages *');
  console.log('*************************');

  const appId = getAppIdFromConfig();
  const contactId = getContactIdFromConfig();
  const conversationId = getConversationIdFromConfig();

  const requestData: ListMessagesRequestData = {
    app_id: appId,
    contact_id: contactId,
    conversation_id: conversationId,
    channel: 'MESSENGER',
  };

  const sinchClient = initClient();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await sinchClient.conversation.messages.list(requestData);

  const messageList: ConversationMessage[] = [];
  const messagesDetailsList: string[] = [];

  // Loop on all the pages to get all the active numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateMessagesList(response, messageList, messagesDetailsList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(messagesDetailsList.length > 0
      ? 'List of messages:\n' + messagesDetailsList.join('\n')
      : 'Sorry, no messages were found.');
  } else {
    printFullResponse(messageList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const message of sinchClient.conversation.messages.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`${message.id} - ${message.accept_time}`);
    } else {
      console.log(message);
    }
  }

})();
