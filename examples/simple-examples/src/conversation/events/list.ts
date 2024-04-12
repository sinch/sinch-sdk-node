import { Conversation, PageResult } from '@sinch/sdk-core';
import {
  getContactIdFromConfig,
  getConversationIdFromConfig,
  getPrintFormat,
  initConversationService,
  printFullResponse,
} from '../../config';

const populateEventsList = (
  eventPage: PageResult<Conversation.ConversationEvent>,
  eventList: Conversation.ConversationEvent[],
  eventDetailsList: string[],
) => {
  eventPage.data.map((event: Conversation.ConversationEvent) => {
    eventList.push(event);
    eventDetailsList.push(`${event.id} - ${event.accept_time}`);
  });
};

(async () => {
  console.log('*********************');
  console.log('* Events_ListEvents *');
  console.log('*********************');

  const contactId = getContactIdFromConfig();
  const conversationId = getConversationIdFromConfig();

  const requestData: Conversation.ListEventsRequestData = {
    contact_id: contactId,
    conversation_id: conversationId,
  };

  const conversationService = initConversationService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await conversationService.events.list(requestData);

  const eventsList: Conversation.ConversationEvent[] = [];
  const eventsDetailsList: string[] = [];

  // Loop on all the pages to get all the active numbers
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateEventsList(response, eventsList, eventsDetailsList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(eventsDetailsList.length > 0
      ? 'List of events:\n' + eventsDetailsList.join('\n')
      : 'Sorry, no events were found.');
  } else {
    printFullResponse(eventsList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const event of conversationService.events.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`${event.id} - ${event.accept_time}`);
    } else {
      console.log(event);
    }
  }

})();
