import { Conversation, PageResult } from '@sinch/sdk-core';
import { getPrintFormat, initConversationService, printFullResponse } from '../../config';

const populateIdentityConflictsList = (
  identityConflictPage: PageResult<Conversation.IdentityConflict>,
  identityConflictList: Conversation.IdentityConflict[],
  identityConflictDetailsList: string[],
) => {
  identityConflictPage.data?.map((identityConflict: Conversation.IdentityConflict) => {
    identityConflictList.push(identityConflict);
    identityConflictDetailsList.push(identityConflict.identity ?? 'No identity');
  });
};

(async () => {
  console.log('*************************');
  console.log('* ListIdentityConflicts *');
  console.log('*************************');

  const requestData: Conversation.ListIdentityConflictsRequestData = {
    page_size: 2,
  };

  const conversationService = initConversationService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await conversationService.contact.listIdentityConflicts(requestData);

  const identityConflictsList: Conversation.IdentityConflict[] = [];
  const identityConflictDetailsList: string[] = [];

  // Loop on all the pages to get all the active numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateIdentityConflictsList(response, identityConflictsList, identityConflictDetailsList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(identityConflictDetailsList.length > 0
      ? 'List of identity conflicts:\n' + identityConflictDetailsList.join('\n')
      : 'Sorry, no identity conflicts were found.');
  } else {
    printFullResponse(identityConflictsList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const identityConflict of conversationService.contact.listIdentityConflicts(requestData)) {
    if (printFormat === 'pretty') {
      console.log(identityConflict.identity ?? 'No identity');
    } else {
      console.log(identityConflict);
    }
  }

})();
