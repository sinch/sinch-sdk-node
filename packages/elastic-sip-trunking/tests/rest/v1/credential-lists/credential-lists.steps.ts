import { ElasticSipTrunking, ElasticSipTrunkingService, CredentialListsApi } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let credentialListsApi: CredentialListsApi;
let credentialList: ElasticSipTrunking.CredentialList;
let credentialListsResponse: PageResult<ElasticSipTrunking.CredentialList>;
let credentialListsList: ElasticSipTrunking.CredentialList[];
let pagesIteration: number;
let deleteCredentialListResponse: void;
let sipTrunksResponse: PageResult<ElasticSipTrunking.SipTrunk>;
let sipTrunksList: ElasticSipTrunking.SipTrunk[];
let credential: ElasticSipTrunking.Credential;

Given('the Elastic SIP Trunking service "Credential Lists" is available', function () {
  const elasticSipTrunkingService = new ElasticSipTrunkingService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    elasticSipTrunkingHostname: 'http://localhost:3016',
  });
  credentialListsApi = elasticSipTrunkingService.credentialLists;
});

When('I send a request to create a Credential List', async () => {
  credentialList = await credentialListsApi.create({
    createCredentialListRequestBody: {
      name: 'Multi credentials list',
      credentials: [
        { username: 'User01', password: 'SecurePassword!234' },
        { username: 'User02', password: 'SecurePassword!234' },
      ],
    },
  });
});

Then('the Credential List is created', () => {
  assert.equal(credentialList.id, '01W4FFL35P4NC4K35CREDLIST01');
  assert.equal(credentialList.name, 'Multi credentials list');
  assert.equal(credentialList.projectId, 'tinyfrog-jump-high-over-lilypadbasin');
  assert.deepEqual(credentialList.createTime, new Date('2024-06-06T14:42:42.377955382Z'));
  assert.equal(credentialList.updateTime, null);
  assert.ok(Array.isArray(credentialList.credentials));
  assert.equal(credentialList.credentials.length, 2);
  assert.equal(credentialList.credentials[0].id, '01W4FFL35P4NC4K35CREDENTIAL1');
  assert.equal(credentialList.credentials[0].username, 'User01');
  assert.equal(credentialList.credentials[1].id, '01W4FFL35P4NC4K35CREDENTIAL2');
  assert.equal(credentialList.credentials[1].username, 'User02');
});

When('I send a request to list the existing Credential Lists', async () => {
  credentialListsResponse = await credentialListsApi.list({});
});

Then('the response contains {string} Credential Lists', (expected: string) => {
  assert.equal(credentialListsResponse.data.length, parseInt(expected, 10));
});

When('I send a request to list all the Credential Lists', async () => {
  credentialListsList = [];
  for await (const cl of credentialListsApi.list({})) {
    credentialListsList.push(cl);
  }
});

Then('the Credential Lists list contains {string} Credential Lists', (expected: string) => {
  assert.equal(credentialListsList.length, parseInt(expected, 10));
});

When('I iterate manually over the Credential Lists pages', async () => {
  credentialListsList = [];
  credentialListsResponse = await credentialListsApi.list({});
  credentialListsList.push(...credentialListsResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (credentialListsResponse.hasNextPage) {
      credentialListsResponse = await credentialListsResponse.nextPage();
      credentialListsList.push(...credentialListsResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the Credential Lists iteration result contains the data from {string} pages', (expected: string) => {
  assert.equal(pagesIteration, parseInt(expected, 10));
});

When('I send a request to list the existing SIP Trunks using a Credential List', async () => {
  sipTrunksResponse = await credentialListsApi.listTrunks({ id: '01W4FFL35P4NC4K35CREDLIST01' });
});

Then('the response contains {string} SIP Trunks using a Credential List', (expected: string) => {
  assert.equal(sipTrunksResponse.data.length, parseInt(expected, 10));
});

When('I send a request to list all the SIP Trunks using a Credential List', async () => {
  sipTrunksList = [];
  for await (const st of credentialListsApi.listTrunks({ id: '01W4FFL35P4NC4K35CREDLIST01' })) {
    sipTrunksList.push(st);
  }
});

Then('the SIP Trunks list contains {string} SIP Trunks using a Credential List', (expected: string) => {
  assert.equal(sipTrunksList.length, parseInt(expected, 10));
});

When('I iterate manually over the SIP Trunks using a Credential List pages', async () => {
  sipTrunksList = [];
  sipTrunksResponse = await credentialListsApi.listTrunks({ id: '01W4FFL35P4NC4K35CREDLIST01' });
  sipTrunksList.push(...sipTrunksResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (sipTrunksResponse.hasNextPage) {
      sipTrunksResponse = await sipTrunksResponse.nextPage();
      sipTrunksList.push(...sipTrunksResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the SIP Trunks using a Credential List list contains {string} SIP Trunks', (expected: string) => {
  assert.equal(sipTrunksList.length, parseInt(expected, 10));
});

// eslint-disable-next-line max-len
Then('the SIP Trunks using a Credential List iteration result contains the data from {string} pages', (expected: string) => {
  assert.equal(pagesIteration, parseInt(expected, 10));
});

When('I send a request to update a Credential List', async () => {
  credentialList = await credentialListsApi.update({
    id: '01W4FFL35P4NC4K35CREDLIST01',
    updateCredentialListRequestBody: {
      name: 'Multi credentials list - Updated',
    },
  });
});

Then('the response contains the Credential List details with updated data', () => {
  assert.equal(credentialList.name, 'Multi credentials list - Updated');
});

When('I send a request to delete a Credential List', async () => {
  deleteCredentialListResponse = await credentialListsApi.delete({
    id: '01W4FFL35P4NC4K35CREDLIST01',
  });
});

Then('the delete Credential List response contains no data', () => {
  assert.deepEqual(deleteCredentialListResponse, {});
});

When('I send a request to update a Credential from a Credential List', async () => {
  credential = await credentialListsApi.updateCredential({
    id: '01W4FFL35P4NC4K35CREDLIST01',
    username: 'User01',
    updateCredentialPasswordRequestBody: { password: 'newPa$$word123' },
  });
});

Then('the response contains the Credential with updated data', () => {
  assert.equal(credential.username, 'User01');
});

When('I send a request to delete a Credential from a Credential List', async () => {
  await credentialListsApi.deleteCredential({
    id: '01W4FFL35P4NC4K35CREDLIST01',
    username: 'User01',
  });
});

Then('the delete Credential response contains no data', () => {
  assert.deepEqual(deleteCredentialListResponse, {});
});
