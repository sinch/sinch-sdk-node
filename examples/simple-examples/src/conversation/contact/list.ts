import { Conversation, PageResult } from '@sinch/sdk-core';
import { getPrintFormat, initConversationService, printFullResponse } from '../../config';

const populateContactsList = (
  contactPage: PageResult<Conversation.Contact>,
  contactList: Conversation.Contact[],
  contactDetailsList: string[],
) => {
  contactPage.data?.map((contact: Conversation.Contact) => {
    contactList.push(contact);
    contactDetailsList.push(`${contact.id} - ${contact.display_name}`);
  });
};

(async () => {
  console.log('************************');
  console.log('* Contact_ListContacts *');
  console.log('************************');

  const requestData: Conversation.ListContactsRequestData = {
    page_size: 2,
  };

  const conversationService = initConversationService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await conversationService.contact.list(requestData);

  const contactList: Conversation.Contact[] = [];
  const contactDetailsList: string[] = [];

  // Loop on all the pages to get all the active numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateContactsList(response, contactList, contactDetailsList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(contactDetailsList.length > 0
      ? 'List of contacts:\n' + contactDetailsList.join('\n')
      : 'Sorry, no contacts were found.');
  } else {
    printFullResponse(contactList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const contact of conversationService.contact.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`${contact.id} - ${contact.display_name}`);
    } else {
      console.log(contact);
    }
  }

})();
