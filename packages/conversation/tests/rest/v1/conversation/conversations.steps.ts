import { Conversation, ConversationApi, ConversationService, SupportedConversationRegion } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let conversationsApi: ConversationApi;
let conversation: Conversation.Conversation;
let listResponse: PageResult<Conversation.Conversation>;
let conversationsList: Conversation.Conversation[];
let listRecentConversationsResponse: PageResult<Conversation.ConversationRecentMessage>;
let recentConversationsList: Conversation.ConversationRecentMessage[];
let pagesIteration: number;
let deleteConversationResponse: void;
let injectEventResponse: Conversation.InjectEventResponse;
let injectMessageResponse: void;
let stopConversationResponse: void;

Given('the Conversation service "Conversations" is available', () => {
  const conversationService = new ConversationService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    conversationHostname: 'http://localhost:3014',
    conversationRegion: SupportedConversationRegion.UNITED_STATES,
  });
  conversationsApi = conversationService.conversation;
});

When('I send a request to create a conversation', async () => {
  conversation = await conversationsApi.create({
    createConversationRequestBody: {
      app_id: '01W4FFL35P4NC4K35CONVAPP001',
      contact_id: '01W4FFL35P4NC4K35CONTACT001',
      active: true,
      active_channel: 'MESSENGER',
      metadata: 'e2e tests',
      metadata_json: {
        prop1: 'value1',
        prop2: 'value2',
      },
    },
  });
});

Then('the conversation is created', () => {
  assert.equal(conversation.id, '01W4FFL35P4NC4K35CONVERS001');
});

When('I send a request to list the existing conversations', async () => {
  listResponse = await conversationsApi.list({
    app_id: '01W4FFL35P4NC4K35CONVAPP001',
    page_size: 2,
  });
});

Then('the response contains {string} conversations', (expectedAnswer: string) => {
  const expectedConversationsCount = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedConversationsCount);
});

When('I send a request to list all the conversations', async () => {
  conversationsList = [];
  for await (const conversation of conversationsApi.list({
    app_id: '01W4FFL35P4NC4K35CONVAPP001',
    page_size: 2,
  })) {
    conversationsList.push(conversation);
  }
});

When('I iterate manually over the conversations pages', async () => {
  conversationsList = [];
  listResponse = await conversationsApi.list({
    app_id: '01W4FFL35P4NC4K35CONVAPP001',
    page_size: 2,
  });
  conversationsList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      conversationsList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the conversations list contains {string} conversations',  (expectedAnswer: string) => {
  const expectedConversationsCount = parseInt(expectedAnswer, 10);
  assert.equal(conversationsList.length, expectedConversationsCount);
});

Then('the conversations iteration result contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

// ////////////////////

When('I send a request to list the recent conversations', async () => {
  listRecentConversationsResponse = await conversationsApi.listRecent({
    app_id: '01W4FFL35P4NC4K35CONVAPP001',
    page_size: 2,
  });
});

Then('the response contains {string} recent conversations', (expectedAnswer: string) => {
  const expectedRecentConversationsCount = parseInt(expectedAnswer, 10);
  assert.equal(listRecentConversationsResponse.data.length, expectedRecentConversationsCount);
});

When('I send a request to list all the recent conversations', async () => {
  recentConversationsList = [];
  for await (const recentConversation of conversationsApi.listRecent({
    app_id: '01W4FFL35P4NC4K35CONVAPP001',
    page_size: 2,
  })) {
    recentConversationsList.push(recentConversation);
  }
});

When('I iterate manually over the recent conversations pages', async () => {
  recentConversationsList = [];
  listRecentConversationsResponse = await conversationsApi.listRecent({
    app_id: '01W4FFL35P4NC4K35CONVAPP001',
    page_size: 2,
  });
  recentConversationsList.push(...listRecentConversationsResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listRecentConversationsResponse.hasNextPage) {
      listRecentConversationsResponse = await listRecentConversationsResponse.nextPage();
      recentConversationsList.push(...listRecentConversationsResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the recent conversations list contains {string} recent conversations',  (expectedAnswer: string) => {
  const expectedRecentConversationsCount = parseInt(expectedAnswer, 10);
  assert.equal(conversationsList.length, expectedRecentConversationsCount);
});

Then('the recent conversations iteration result contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

When('I send a request to retrieve a conversation', async () => {
  conversation = await conversationsApi.get({
    conversation_id: '01W4FFL35P4NC4K35CONVERS001',
  });
});

Then('the response contains the conversation details', () => {
  assert.equal(conversation.id, '01W4FFL35P4NC4K35CONVERS001');
  assert.equal(conversation.app_id, '01W4FFL35P4NC4K35CONVAPP001');
  assert.equal(conversation.contact_id, '01W4FFL35P4NC4K35CONTACT002');
  assert.deepEqual(conversation.last_received, new Date('2024-06-06T14:42:42Z'));
  assert.equal(conversation.active_channel, 'MESSENGER');
  assert.equal(conversation.active, true);
  assert.equal(conversation.metadata, 'e2e tests');
  assert.deepEqual(conversation.metadata_json, {
    prop1: 'value1',
    prop2: 'value2',
  });
  assert.equal(conversation.correlation_id, '');
});

When('I send a request to update a conversation', async () => {
  conversation = await conversationsApi.update({
    conversation_id: '01W4FFL35P4NC4K35CONVERS001',
    updateConversationRequestBody: {
      active: false,
      app_id: '01W4FFL35P4NC4K35CONVAPP002',
      metadata: 'Transferred conversation',
      correlation_id: 'my-correlator',
    },
  });
});

Then('the response contains the conversation details with updated data', () => {
  assert.equal(conversation.id, '01W4FFL35P4NC4K35CONVERS001');
  assert.equal(conversation.app_id, '01W4FFL35P4NC4K35CONVAPP002');
  assert.equal(conversation.active, false);
  assert.equal(conversation.metadata, 'Transferred conversation');
  assert.equal(conversation.correlation_id, 'my-correlator');
});

When('I send a request to delete a conversation', async () => {
  deleteConversationResponse = await conversationsApi.delete({
    conversation_id: '01W4FFL35P4NC4K35CONVERS001',
  });
});

Then('the delete conversation response contains no data', () => {
  assert.deepEqual(deleteConversationResponse, {} );
});

When('I send a request to inject an event into a conversation', async () => {
  injectEventResponse = await conversationsApi.injectEvent({
    conversation_id: '01W4FFL35P4NC4K35CONVERS001',
    injectConversationEventRequestBody: {
      app_event: {
        composing_event: {},
      },
      accept_time: new Date('2024-06-06T15:15:15Z'),
    },
  });
});

Then('the event is created and injected in the conversation', () => {
  assert.equal(injectEventResponse.event_id, '01W4FFL35P4NC4K35CONVEVENT1');
  assert.deepEqual(injectEventResponse.accepted_time, new Date('2024-06-06T15:15:15Z'));
});

When('I send a request to inject a message into a conversation', async () => {
  injectMessageResponse = await conversationsApi.injectMessage({
    conversation_id: '01W4FFL35P4NC4K35CONVERS001',
    injectMessageRequestBody: {
      app_message: {
        text_message: {
          text: 'Injected text message',
        },
      },
      accept_time: new Date('2024-06-06T14:42:42Z'),
      direction: 'TO_CONTACT',
      contact_id: '01W4FFL35P4NC4K35CONTACT002',
      channel_identity: {
        channel: 'MESSENGER',
        identity: '7968425018576406',
        app_id: '01W4FFL35P4NC4K35CONVAPP001',
      },
    },
  });
});

Then('the message is created and injected in the conversation', () => {
  assert.deepEqual(injectMessageResponse, {});
});

When('I send a request to stop a conversation', async () => {
  stopConversationResponse = await conversationsApi.stopActive({
    conversation_id: '01W4FFL35P4NC4K35CONVERS001',
  });
});

Then('the stop conversation response contains no data', () => {
  assert.deepEqual(stopConversationResponse, {} );
});
