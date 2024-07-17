import { Conversation, ConversationService, EventsApi, SupportedConversationRegion } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let eventsApi: EventsApi;
let eventResponse: Conversation.SendEventResponse;
let listResponse: PageResult<Conversation.ConversationEvent>;
let eventsList: Conversation.ConversationEvent[];
let pagesIteration: number;
let event: Conversation.ConversationEvent;
let deleteEventResponse: void;

Given('the Conversation service "Events" is available', function () {
  const conversationService = new ConversationService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    conversationHostname: 'http://localhost:3014',
    conversationRegion: SupportedConversationRegion.UNITED_STATES,
  });
  eventsApi = conversationService.events;
});

When('I send a request to send a conversation event to a contact', async () => {
  eventResponse = await eventsApi.send({
    sendEventRequestBody: {
      event: {
        composing_event: {},
      },
      app_id: '01W4FFL35P4NC4K35CONVAPP001',
      recipient: {
        contact_id: '01W4FFL35P4NC4K35CONTACT001',
      },
    },
  });
});

Then('the response contains the id of the conversation event', () => {
  assert.equal(eventResponse.event_id, '01W4FFL35P4NC4K35CONVEVENT1');
});

When('I send a request to list the existing conversation events', async () => {
  listResponse = await eventsApi.list({
    page_size: 2,
  });
});

Then('the response contains {string} conversation events', (expectedAnswer: string) => {
  const expectedEventsCount = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedEventsCount);
});

When('I send a request to list all the conversation events', async () => {
  eventsList = [];
  for await (const message of eventsApi.list({ page_size: 2 })) {
    eventsList.push(message);
  }
});

When('I iterate manually over the conversation events pages', async () => {
  eventsList = [];
  listResponse = await eventsApi.list({
    page_size: 2,
  });
  eventsList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      eventsList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the conversation events list contains {string} conversation events',  (expectedAnswer: string) => {
  const expectedServices = parseInt(expectedAnswer, 10);
  assert.equal(eventsList.length, expectedServices);
});

Then('the conversation events iteration result contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

When('I send a request to retrieve a conversation event', async () => {
  event = await eventsApi.get({
    event_id: '01W4FFL35P4NC4K35CONVEVENT1',
  });
});

Then('the response contains the conversation event details', () => {
  assert.equal(event.id, '01W4FFL35P4NC4K35CONVEVENT1');
  assert.equal(event.direction, 'TO_CONTACT');
  assert.equal(event.conversation_id, '01W4FFL35P4NC4K35CONVERSATI');
  assert.equal(event.contact_id, '01W4FFL35P4NC4K35CONTACT001');
  assert.deepEqual(event.accept_time, new Date('2024-06-06T12:42:42Z'));
  assert.equal(event.processing_mode, 'CONVERSATION');
  const channelIdentity: Conversation.ChannelIdentity = {
    channel: 'MESSENGER',
    identity: '7968425018576406',
    app_id: '01W4FFL35P4NC4K35CONVAPP001',
  };
  assert.deepEqual(event.channel_identity, channelIdentity);
  const composingEvent: Conversation.ComposingEvent = {
    composing_event: {}
  };
  assert.deepEqual(event.app_event, composingEvent);
});

When('I send a request to delete a conversation event', async () => {
  deleteEventResponse = await eventsApi.delete({
    event_id: '01W4FFL35P4NC4K35CONVEVENT1',
  });
});

Then('the delete conversation event response contains no data', () => {
  assert.deepEqual(deleteEventResponse, {} );
});
