import { Conversation, ListConversationsRequestData, PageResult } from '@sinch/sdk-core';
import { getAppIdFromConfig, getPrintFormat, initConversationService, printFullResponse } from '../../config';

const populateConversationsList = (
  conversationPage: PageResult<Conversation>,
  conversationList: Conversation[],
  conversationDetailsList: string[],
) => {
  conversationPage.data.map((conversation: Conversation) => {
    conversationList.push(conversation);
    conversationDetailsList.push(`${conversation.id} - ${conversation.active_channel}`);
  });
};

(async () => {
  console.log('**********************************');
  console.log('* Conversation_ListConversations *');
  console.log('**********************************');

  const appId = getAppIdFromConfig();

  const requestData: ListConversationsRequestData = {
    only_active: false,
    app_id: appId,
  };

  const conversationService = initConversationService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await conversationService.conversation.list(requestData);

  const conversationList: Conversation[] = [];
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
  for await (const conversation of conversationService.conversation.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`${conversation.id} - ${conversation.active_channel}`);
    } else {
      console.log(conversation);
    }
  }

})();
