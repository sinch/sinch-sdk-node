import { Conversation, ConversationService, MessagesApi, SupportedConversationRegion } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let messagesApi: MessagesApi;
let messageResponse: Conversation.SendMessageResponse;
let listResponse: PageResult<Conversation.ConversationMessage>;
const messagesList: Conversation.ConversationMessage[] = [];
let message: Conversation.ConversationMessage;
let deleteMessageResponse: void;

Given('the Conversation service "Messages" is available', function () {
  const conversationService = new ConversationService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    conversationHostname: 'http://localhost:3014',
    conversationRegion: SupportedConversationRegion.UNITED_STATES,
  });
  messagesApi = conversationService.messages;
});

When('I send a request to send a message to a contact', async () => {
  messageResponse = await messagesApi.send({
    sendMessageRequestBody: {
      message: {
        text_message: {
          text: 'Hello',
        },
      },
      app_id: '01W4FFL35P4NC4K35CONVAPP001',
      recipient: {
        contact_id: '01W4FFL35P4NC4K35CONTACT001',
      },
    },
  });
});

Then('the response contains the id of the message', () => {
  assert.equal(messageResponse.message_id, '01W4FFL35P4NC4K35MESSAGE001');
});

When('I send a request to list the existing messages', async () => {
  listResponse = await messagesApi.list({
    page_size: 2,
  });
});

Then('the response contains {string} messages', (expectedAnswer: string) => {
  const expectedMessagesCount = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedMessagesCount);
});

When('I send a request to list all the messages', async () => {
  for await (const service of messagesApi.list({ page_size: 2 })) {
    messagesList.push(service);
  }
});

When('I iterate manually over the messages pages', async () => {
  listResponse = await messagesApi.list({
    page_size: 2,
  });
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the messages list contains {string} messages',  (expectedAnswer: string) => {
  const expectedServices = parseInt(expectedAnswer, 10);
  assert.equal(messagesList.length, expectedServices);
});

When('I send a request to retrieve a message', async () => {
  message = await messagesApi.get({
    message_id: '01W4FFL35P4NC4K35MESSAGE001',
  });
});

Then('the response contains the message details', () => {
  assert.equal(message.id, '01W4FFL35P4NC4K35MESSAGE001');
  assert.equal(message.direction, 'TO_CONTACT');
  assert.equal(message.conversation_id, '01W4FFL35P4NC4K35CONVERSATI');
  assert.equal(message.contact_id, '01W4FFL35P4NC4K35CONTACT001');
  assert.equal(message.metadata, '');
  assert.deepEqual(message.accept_time, new Date('2024-06-06T12:42:42Z'));
  assert.equal(message.processing_mode, 'CONVERSATION');
  assert.equal(message.injected, false);
  const channelIdentity: Conversation.ChannelIdentity = {
    channel: 'SMS',
    identity: '12015555555',
    app_id: '',
  };
  assert.deepEqual(message.channel_identity, channelIdentity);
});

When('I send a request to update a message', async () => {
  message = await messagesApi.update({
    message_id: '01W4FFL35P4NC4K35MESSAGE001',
    updateMessageRequestBody: {
      metadata: 'Updated metadata',
    },
  });
});

Then('the response contains the message details with updated metadata', () => {
  assert.equal(message.id, '01W4FFL35P4NC4K35MESSAGE001');
  assert.equal(message.metadata, 'Updated metadata');
});

When('I send a request to delete a message', async () => {
  deleteMessageResponse = await messagesApi.delete({
    message_id: '01W4FFL35P4NC4K35MESSAGE001',
  });
});

Then('the delete message response contains no data', () => {
  assert.deepEqual(deleteMessageResponse, {} );
});
