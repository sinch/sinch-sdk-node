import { Conversation, ContactApi, ConversationService, SupportedConversationRegion } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let contactsApi: ContactApi;
let contact: Conversation.Contact;
let listResponse: PageResult<Conversation.Contact>;
let contactsList: Conversation.Contact[];
let pagesIteration: number;
let deleteContactResponse: void;
let channelProfile: Conversation.GetChannelProfileResponse;

Given('the Conversation service "Contacts" is available', function () {
  const conversationService = new ConversationService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    conversationHostname: 'http://localhost:3014',
    conversationRegion: SupportedConversationRegion.UNITED_STATES,
  });
  contactsApi = conversationService.contact;
});

When('I send a request to create a contact', async () => {
  contact = await contactsApi.create({
    contactCreateRequestBody: {
      channel_identities: [
        {
          channel: 'SMS',
          identity: '+12015555555',
        },
      ],
      language: 'EN_US',
      display_name: 'Marty McFly',
      email: 'time.traveler@delorean.com',
    },
  });
});

Then('the contact is created', () => {
  assert.equal(contact.id, '01W4FFL35P4NC4K35CONTACT001');
});

When('I send a request to list the existing contacts', async () => {
  listResponse = await contactsApi.list({
    page_size: 2,
  });
});

Then('the response contains {string} contacts', (expectedAnswer: string) => {
  const expectedContactsCount = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedContactsCount);
});

When('I send a request to list all the contacts', async () => {
  contactsList = [];
  for await (const contact of contactsApi.list({ page_size: 2 })) {
    contactsList.push(contact);
  }
});

When('I iterate manually over the contacts pages', async () => {
  contactsList = [];
  listResponse = await contactsApi.list({
    page_size: 2,
  });
  contactsList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      contactsList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the contacts list contains {string} contacts',  (expectedAnswer: string) => {
  const expectedServices = parseInt(expectedAnswer, 10);
  assert.equal(contactsList.length, expectedServices);
});

Then('the contacts iteration result contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

When('I send a request to retrieve a contact', async () => {
  contact = await contactsApi.get({
    contact_id: '01W4FFL35P4NC4K35CONTACT001',
  });
});

Then('the response contains the contact details', () => {
  assert.equal(contact.id, '01W4FFL35P4NC4K35CONTACT001');
  assert.equal(contact.channel_identities?.length, 1);
  const channelIdentity = contact.channel_identities![0];
  assert.equal(channelIdentity.channel, 'SMS');
  assert.equal(channelIdentity.identity, '12015555555');
  assert.equal(contact.channel_priority?.length, 0);
  assert.equal(contact.display_name, 'Marty McFly');
  assert.equal(contact.email, 'time.traveler@delorean.com');
  assert.equal(contact.language, 'EN_US');
});

When('I send a request to update a contact', async () => {
  contact = await contactsApi.update({
    contact_id: '01W4FFL35P4NC4K35CONTACT001',
    updateContactRequestBody: {
      channel_identities: [
        {
          channel: 'MESSENGER',
          identity: '7968425018576406',
          app_id: '01W4FFL35P4NC4K35CONVAPP001',
        },
        {
          channel: 'SMS',
          identity: '12015555555',
        },
      ],
      channel_priority: ['MESSENGER'],
    },
  });
});

Then('the response contains the contact details with updated data', () => {
  assert.equal(contact.id, '01W4FFL35P4NC4K35CONTACT001');
  assert.equal(contact.channel_identities?.length, 2);
});

When('I send a request to delete a contact', async () => {
  deleteContactResponse = await contactsApi.delete({
    contact_id: '01W4FFL35P4NC4K35CONTACT001',
  });
});

Then('the delete contact response contains no data', () => {
  assert.deepEqual(deleteContactResponse, {} );
});

When('I send a request to merge a source contact to a destination contact', async () => {
  contact = await contactsApi.mergeContact({
    destination_id: '01W4FFL35P4NC4K35CONTACT002',
    mergeContactRequestBody: {
      source_id: '01W4FFL35P4NC4K35CONTACT001',
    },
  });
});

Then('the response contains data from the destination contact and from the source contact', () => {
  const channelIdentities = contact.channel_identities!;
  assert.equal(channelIdentities.length, 3);
  assert.equal(channelIdentities[0].channel, 'MESSENGER');
  assert.equal(channelIdentities[1].channel, 'MMS');
  assert.equal(channelIdentities[2].channel, 'SMS');
  assert.deepEqual(contact.channel_priority, ['MMS', 'MESSENGER']);
  assert.equal(contact.display_name, 'Pika pika');
  assert.equal(contact.email, 'pikachu@poke.mon');
});

When('I send a request to get the channel profile of a contact ID', async () => {
  channelProfile = await contactsApi.getChannelProfile({
    getChannelProfileRequestBody: {
      app_id: '01W4FFL35P4NC4K35CONVAPP001',
      channel: 'MESSENGER',
      recipient: {
        contact_id: '01W4FFL35P4NC4K35CONTACT001',
      },
    },
  });
});

Then('the response contains the profile of the contact on the requested channel', () => {
  assert.equal(channelProfile.profile_name, 'Marty McFly FB' );
});
