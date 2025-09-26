import { Given, Then, When } from '@cucumber/cucumber';
import { ConsentsApi, Conversation, ConversationService, SupportedConversationRegion } from '../../../../src';
import { PageResult } from '@sinch/sdk-client';
import assert from 'assert';

let consentsApi: ConsentsApi;
let listResponse: PageResult<Conversation.ConsentIdentity>;
let identitiesList: Conversation.ConsentIdentity[];
let pagesIteration: number;
let auditRecords: Conversation.AuditRecordsList;

Given('the Conversation service "Consents" is available', function () {
  const conversationService = new ConversationService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    conversationHostname: 'http://localhost:3014',
    conversationRegion: SupportedConversationRegion.UNITED_STATES,
  });
  consentsApi = conversationService.consents;
});

When('I send a request to list the existing Consent Identities', async () => {
  listResponse = await consentsApi.listIdentities({
    app_id: '01W4FFL35P4NC4K35CONVAPP001',
    list_type: 'OPT_OUT_ALL',
    page_size: 10,
  });
});

Then('the response contains {string} Consent Identities', (expectedAnswer: string) => {
  const expectedIdentitiesCount = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedIdentitiesCount);
});

When('I send a request to list all the Consent Identities', async () => {
  identitiesList = [];
  for await (const identity of consentsApi.listIdentities({
    app_id: '01W4FFL35P4NC4K35CONVAPP001',
    list_type: 'OPT_OUT_ALL',
    page_size: 10,
  })) {
    identitiesList.push(identity);
  }
});

When('I iterate manually over the Consent Identities pages', async () => {
  identitiesList = [];
  listResponse = await consentsApi.listIdentities({
    app_id: '01W4FFL35P4NC4K35CONVAPP001',
    list_type: 'OPT_OUT_ALL',
    page_size: 10,
  });
  identitiesList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      identitiesList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the Consent Identities list contains {string} Consent Identities',  (expectedAnswer: string) => {
  const expectedServices = parseInt(expectedAnswer, 10);
  assert.equal(identitiesList.length, expectedServices);
});

Then('the Consent Identities iteration result contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

When('I send a request to list the Audit Records associated with an identity', async () => {
  auditRecords = await consentsApi.listAuditRecords({
    app_id: '01W4FFL35P4NC4K35CONVAPP001',
    identity: '3361234567',
  });
});

Then('the response contains list of the Audit Records associated with an identity', () => {
  assert.equal(auditRecords.identity?.identity, '33612345678');
  assert.equal(auditRecords.audit_records?.length, 1);
  const expectedAuditRecord: Conversation.AuditRecord = {
    operation: 'OPERATION_INSERT',
    list_type: 'OPT_OUT_ALL',
    project_id: '123coffee-dada-beef-cafe-baadc0de5678',
    app_id: '01W4FFL35P4NC4K35CONVAPP001',
    datetime: new Date('2025-06-06T14:42:56.031323Z'),
    origin: 'ORIGIN_MO',
  };
  assert.deepEqual(auditRecords.audit_records![0], expectedAuditRecord);
});
