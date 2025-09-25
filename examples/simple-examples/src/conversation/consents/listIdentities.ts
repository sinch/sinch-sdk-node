import { Conversation, PageResult } from '@sinch/sdk-core';
import { getAppIdFromConfig, getPrintFormat, initConversationService, printFullResponse } from '../../config';

const populateIdentitiesList = (
  consentIdentitiesPage: PageResult<Conversation.ConsentIdentity>,
  identitiesList: Conversation.ConsentIdentity[],
  identitiesDetailsList: string[],
) => {
  consentIdentitiesPage.data?.map((consentIdentity: Conversation.ConsentIdentity) => {
    identitiesList.push(consentIdentity);
    identitiesDetailsList.push(consentIdentity.identity);
  });
};

(async () => {
  console.log('**********************************');
  console.log('* ListIdentitiesFromConsentsList *');
  console.log('**********************************');

  const appId = getAppIdFromConfig();

  const requestData: Conversation.ListIdentitiesRequestData = {
    app_id: appId,
    list_type: 'OPT_OUT_ALL',
    page_size: 10,
  };

  const conversationService = initConversationService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await conversationService.consents.listIdentities(requestData);

  const identitiesList: Conversation.ConsentIdentity[] = [];
  const identitiesDetailsList: string[] = [];

  // Loop on all the pages to get all the active numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateIdentitiesList(response, identitiesList, identitiesDetailsList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(identitiesDetailsList.length > 0
      ? 'List of identities:\n' + identitiesDetailsList.join('\n')
      : 'Sorry, no identities were found.');
  } else {
    printFullResponse(identitiesList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const consentIdentity of conversationService.consents.listIdentities(requestData)) {
    if (printFormat === 'pretty') {
      console.log(consentIdentity.identity);
    } else {
      console.log(consentIdentity);
    }
  }

})();
