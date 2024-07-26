import { ElasticSipTrunking, ElasticSipTrunkingService, SipTrunksApi } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let sipTrunkApi: SipTrunksApi;
let sipTrunk: ElasticSipTrunking.SipTrunk;
let listResponse: PageResult<ElasticSipTrunking.SipTrunk>;
let sipTrunksList: ElasticSipTrunking.SipTrunk[];
let pagesIteration: number;
let deleteSipTrunkResponse: void;
let aclIdsList: ElasticSipTrunking.AddAccessControlListToTrunk;
let listAclsResponse: PageResult<string>;
let aclsList: string[];
let deleteAclFromTrunkResponse: void;

Given('the Elastic SIP Trunking service "SIP Trunks" is available', function () {
  const elasticSipTrunkingService = new ElasticSipTrunkingService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    elasticSipTrunkingHostname: 'http://localhost:3016',
  });
  sipTrunkApi = elasticSipTrunkingService.sipTrunks;
});

When('I send a request to create a SIP Trunk', async () => {
  sipTrunk = await sipTrunkApi.create({
    createSipTrunkRequestBody: {
      name: 'Friendly name for e2e test',
      hostName: 'e2e-sip-trunk-domain',
    },
  });
});

Then('the SIP Trunk is created', () => {
  assert.equal(sipTrunk.id, '01W4FFL35P4NC4K35SIPTRUNK1');
  assert.equal(sipTrunk.projectId, 'tinyfrog-jump-high-over-lilypadbasin');
  assert.equal(sipTrunk.name, 'Friendly name for e2e test');
  assert.equal(sipTrunk.hostName, 'e2e-sip-trunk-domain');
  assert.equal(sipTrunk.domain, 'e2e-sip-trunk-domain.pstn.sinch.com');
  assert.equal(sipTrunk.topLevelDomain, 'pstn.sinch.com');
  assert.equal(sipTrunk.callsPerSecond, 1);
  assert.equal(sipTrunk.enableCallerName, false);
  assert.deepEqual(sipTrunk.createTime, new Date('2024-06-06T14:42:42.820177628Z'));
  assert.equal(sipTrunk.updateTime, null);
});

When('I send a request to list the existing SIP trunks', async () => {
  listResponse = await sipTrunkApi.list({});
});

Then('the response contains {string} SIP trunks', (expectedAnswer: string) => {
  const expectedMessagesCount = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedMessagesCount);
});

When('I send a request to list all the SIP trunks', async () => {
  sipTrunksList = [];
  for await (const sipTrunk of sipTrunkApi.list({})) {
    sipTrunksList.push(sipTrunk);
  }
});

When('I iterate manually over the SIP trunks pages', async () => {
  sipTrunksList = [];
  listResponse = await sipTrunkApi.list({});
  sipTrunksList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      sipTrunksList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the SIP trunks list contains {string} SIP trunks',  (expectedAnswer: string) => {
  const expectedServices = parseInt(expectedAnswer, 10);
  assert.equal(sipTrunksList.length, expectedServices);
});

Then('the SIP trunks iteration result contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

When('I send a request to retrieve a SIP trunk', async () => {
  sipTrunk = await sipTrunkApi.get({
    sipTrunkId: '01W4FFL35P4NC4K35SIPTRUNK1',
  });
});

Then('the response contains the SIP trunk details', () => {
  assert.equal(sipTrunk.id, '01W4FFL35P4NC4K35SIPTRUNK1');
  assert.deepEqual(sipTrunk.createTime, new Date('2024-06-06T14:42:42Z'));
});

When('I send a request to update a SIP trunk', async () => {
  sipTrunk = await sipTrunkApi.update({
    sipTrunkId: '01W4FFL35P4NC4K35SIPTRUNK1',
    updateSipTrunkRequestBody: {
      name: 'Updated name for e2e test',
      hostName: 'us-sip-trunk-domain',
      enableCallerName: true,
    },
  });
});

Then('the response contains the SIP trunk details with updated data', () => {
  assert.equal(sipTrunk.id, '01W4FFL35P4NC4K35SIPTRUNK1');
  assert.equal(sipTrunk.name, 'Updated name for e2e test');
  assert.equal(sipTrunk.hostName, 'us-sip-trunk-domain');
  assert.equal(sipTrunk.domain, 'e2e-sip-trunk-domain.pstn.sinch.com');
  assert.equal(sipTrunk.enableCallerName, true);
  assert.deepEqual(sipTrunk.createTime, new Date('2024-06-06T14:42:42Z'));
  assert.deepEqual(sipTrunk.updateTime, new Date('2024-06-06T14:48:14.87833248Z'));
});

When('I send a request to delete a SIP trunk', async () => {
  deleteSipTrunkResponse = await sipTrunkApi.delete({
    sipTrunkId: '01W4FFL35P4NC4K35SIPTRUNK1',
  });
});

Then('the delete SIP trunk response contains no data', () => {
  assert.deepEqual(deleteSipTrunkResponse, {} );
});

When('I send a request to add ACLs to a SIP trunk', async () => {
  aclIdsList = await sipTrunkApi.addAccessControlList({
    trunkId: '01W4FFL35P4NC4K35SIPTRUNK1',
    addAccessControlListToTrunkRequestBody: {
      accessControlListIds: [
        '01W4FFL35P4NC4K35TRUNKACL1',
      ],
    },
  });
});

Then('the response contains the list of ACLs added to the trunk', () => {
  assert.ok(aclIdsList.accessControlListIds);
  assert.equal(aclIdsList.accessControlListIds.length, 1);
});

When('I send a request to add an empty ACLs list to a SIP trunk', async () => {
  aclIdsList = await sipTrunkApi.addAccessControlList({
    trunkId: '01W4FFL35P4NC4K35SIPTRUNK1',
    addAccessControlListToTrunkRequestBody: {
      accessControlListIds: [],
    },
  });
});

Then('the response contains unexpectedly an empty JSON object', () => {
  assert.deepEqual(aclIdsList, {});
});

When('I send a request to list the existing ACLs for a SIP Trunk', async () => {
  listAclsResponse = await sipTrunkApi.listAccessControlLists({
    trunkId: '01W4FFL35P4NC4K35SIPTRUNK1',
  });
});

Then('the response contains {string} ACLs for a SIP Trunk', (expectedAnswer: string) => {
  const expectedMessagesCount = parseInt(expectedAnswer, 10);
  assert.equal(listAclsResponse.data.length, expectedMessagesCount);
});

When('I send a request to list all the ACLs for a SIP Trunk', async () => {
  aclsList = [];
  for await (const acl of sipTrunkApi.listAccessControlLists({ trunkId: '01W4FFL35P4NC4K35SIPTRUNK1' })) {
    aclsList.push(acl);
  }
});

When('I iterate manually over the ACLs for a SIP Trunk pages', async () => {
  aclsList = [];
  listAclsResponse = await sipTrunkApi.listAccessControlLists({ trunkId: '01W4FFL35P4NC4K35SIPTRUNK1' });
  aclsList.push(...listAclsResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listAclsResponse.hasNextPage) {
      listAclsResponse = await listAclsResponse.nextPage();
      aclsList.push(...listAclsResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the ACLs list contains {string} ACLs for a SIP Trunk',  (expectedAnswer: string) => {
  const expectedServices = parseInt(expectedAnswer, 10);
  assert.equal(sipTrunksList.length, expectedServices);
});

Then('the ACLs for a SIP Trunk iteration result contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

When('I send a request to delete an ACL from a SIP trunk', async () => {
  deleteAclFromTrunkResponse = await sipTrunkApi.deleteAccessControlList({
    trunkId: '01W4FFL35P4NC4K35SIPTRUNK1',
    accessControlListId: '01W4FFL35P4NC4K35TRUNKACL1',
  });
});

Then('the delete ACL from a SIP trunk response contains no data', () => {
  assert.deepEqual(deleteAclFromTrunkResponse, {} );
});
