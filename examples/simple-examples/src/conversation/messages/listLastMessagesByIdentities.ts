import { Conversation, PageResult } from '@sinch/sdk-core';
import {
  getAppIdFromConfig,
  getContactIdFromConfig, getConversationIdFromConfig, getPhoneNumberFromConfig,
  getPrintFormat,
  initConversationService,
  printFullResponse,
} from '../../config';

const populateMessagesList = (
  conversationPage: PageResult<Conversation.ConversationMessage>,
  conversationList: Conversation.ConversationMessage[],
  conversationDetailsList: string[],
) => {
  conversationPage.data.map((message: Conversation.ConversationMessage) => {
    conversationList.push(message);
    conversationDetailsList.push(`${message.id} - ${message.accept_time}`);
  });
};

(async () => {
  console.log('******************************************');
  console.log('* Messages_ListMessagesByChannelIdentity *');
  console.log('******************************************');

  // The API expects the phone number in E.164 format without the "+" sign
  const phoneNumber = getPhoneNumberFromConfig().substring(1);

  const requestData: Conversation.ListLastMessagesByChannelIdentityRequestData = {
    listLastMessagesByChannelIdentityRequestBody: {
      channel_identities: [phoneNumber],
      messages_source: 'DISPATCH_SOURCE',
    },
  };

  const conversationService = initConversationService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await conversationService.messages.listLastMessagesByChannelIdentity(requestData);

  const messageList: Conversation.ConversationMessage[] = [];
  const messagesDetailsList: string[] = [];

  // Loop on all the pages to get all the last messages by channel identity
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
  for await (const message of conversationService.messages.listLastMessagesByChannelIdentity(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`${message.id} - ${message.accept_time}`);
    } else {
      console.log(message);
    }
  }

})();
