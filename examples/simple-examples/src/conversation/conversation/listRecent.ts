import {
  ConversationRecentMessage,
  ListRecentConversationsRequestData,
  PageResult,
} from '@sinch/sdk-core';
import { getAppIdFromConfig, getPrintFormat, initConversationService, printFullResponse } from '../../config';

const populateConversationsList = (
  conversationPage: PageResult<ConversationRecentMessage>,
  conversationList: ConversationRecentMessage[],
  conversationDetailsList: string[],
) => {
  conversationPage.data.map((recentConversation: ConversationRecentMessage) => {
    conversationList.push(recentConversation);
    conversationDetailsList.push(`${recentConversation.conversation?.id} - ${recentConversation.conversation?.active_channel}\n - Latest message: ${recentConversation.last_message?.accept_time}`);
  });
};

(async () => {
  console.log('****************************************');
  console.log('* Conversation_ListRecentConversations *');
  console.log('****************************************');

  const appId = getAppIdFromConfig();

  const requestData: ListRecentConversationsRequestData = {
    only_active: true,
    app_id: appId,
    order: 'ASC',
  };

  const conversationService = initConversationService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await conversationService.conversation.listRecent(requestData);

  const conversationList: ConversationRecentMessage[] = [];
  const conversationDetailsList: string[] = [];

  // Loop on all the pages to get all the active numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateConversationsList(response, conversationList, conversationDetailsList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(conversationDetailsList.length > 0
      ? 'List of conversations:\n' + conversationDetailsList.join('\n')
      : 'Sorry, no conversations were found.');
  } else {
    printFullResponse(conversationList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const recentConversation of conversationService.conversation.listRecent(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`${recentConversation.conversation?.id} - ${recentConversation.conversation?.active_channel}\n - Latest message: ${recentConversation.last_message?.accept_time}`);
    } else {
      console.log(recentConversation);
    }
  }

})();
