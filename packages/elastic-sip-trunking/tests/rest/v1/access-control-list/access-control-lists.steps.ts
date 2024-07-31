import { ElasticSipTrunking, ElasticSipTrunkingService, AccessControlListApi } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let accessControlListsApi: AccessControlListApi;
let accessControlList: ElasticSipTrunking.AccessControlList;
let listResponse: PageResult<ElasticSipTrunking.AccessControlList>;
let aclsList: ElasticSipTrunking.AccessControlList[];
let pagesIteration: number;
let deleteAclResponse: void;
let ipRange: ElasticSipTrunking.IpRange;
let listIpRangesResponse: PageResult<ElasticSipTrunking.IpRange>;
let ipRangesList: ElasticSipTrunking.IpRange[];
let deleteIpRangeResponse: void;
let addedAclsList: ElasticSipTrunking.AddAccessControlListToTrunk;
let listAclIdsResponse: PageResult<string>;
let aclIdsList: string[];
let deleteAclFromTrunkResponse: void;

Given('the Elastic SIP Trunking service "Access Control Lists" is available', function () {
  const elasticSipTrunkingService = new ElasticSipTrunkingService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    elasticSipTrunkingHostname: 'http://localhost:3016',
  });
  accessControlListsApi = elasticSipTrunkingService.accessControlList;
});

When('I send a request to create an Access Control List', async () => {
  accessControlList = await accessControlListsApi.create({
    createAccessControlListBody: {
      name: 'My Access Control List',
      ipRanges: [
        {
          description: 'Location 1',
          ipAddress: '15.15.15.15',
        },
      ],
    },
  });
});

Then('the Access Control List is created', () => {
  assert.equal(accessControlList.id, '01W4FFL35P4NC4K35SIPACL001');
  assert.equal(accessControlList.name, 'My Access Control List');
  assert.equal(accessControlList.enabled, true);
  assert.equal(accessControlList.projectId, 'tinyfrog-jump-high-over-lilypadbasin');
  assert.deepEqual(accessControlList.createTime, new Date('2024-06-06T14:42:42.892741384Z'));
  assert.equal(accessControlList.updateTime, null);
  assert.ok(accessControlList.ipRanges);
  const ipRange = accessControlList.ipRanges[0];
  assert.equal(ipRange.id, '01W4FFL35P4NC4K35IPRANGE01');
  assert.equal(ipRange.accessControlListId, '01W4FFL35P4NC4K35SIPACL001');
  assert.equal(ipRange.description, 'Location 1');
  assert.equal(ipRange.ipAddress, '15.15.15.15');
  assert.equal(ipRange.range, 32);
  assert.equal(ipRange.projectId, 'tinyfrog-jump-high-over-lilypadbasin');
  assert.deepEqual(ipRange.createTime, new Date('2024-06-06T14:42:42.896695235Z'));
  assert.equal(ipRange.updateTime, null);
});

When('I send a request to list the existing Access Control Lists', async () => {
  listResponse = await accessControlListsApi.list({});
});

Then('the response contains {string} Access Control Lists', (expectedAnswer: string) => {
  const expectedAclsCount = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedAclsCount);
  accessControlList = listResponse.data[0];
  assert.equal(accessControlList.id, '01W4FFL35P4NC4K35SIPACL001');
  assert.deepEqual(accessControlList.createTime, new Date('2024-06-06T14:42:42Z'));
  const ipRange = accessControlList.ipRanges[0];
  assert.deepEqual(ipRange.createTime, new Date('2024-06-06T14:42:42Z'));
});

When('I send a request to list all the Access Control Lists', async () => {
  aclsList = [];
  for await (const acl of accessControlListsApi.list({})) {
    aclsList.push(acl);
  }
});

When('I iterate manually over the Access Control Lists pages', async () => {
  aclsList = [];
  listResponse = await accessControlListsApi.list({});
  aclsList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      aclsList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the Access Control Lists list contains {string} Access Control Lists',  (expectedAnswer: string) => {
  const expectedAclsCount = parseInt(expectedAnswer, 10);
  assert.equal(aclsList.length, expectedAclsCount);
});

Then('the Access Control Lists iteration result contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

When('I send a request to retrieve an Access Control List', async () => {
  accessControlList = await accessControlListsApi.get({
    id: '01W4FFL35P4NC4K35SIPACL001',
  });
});

Then('the response contains the Access Control List details', () => {
  assert.equal(accessControlList.id, '01W4FFL35P4NC4K35SIPACL001');
  assert.equal(accessControlList.name, 'My Access Control List');
  assert.deepEqual(accessControlList.createTime, new Date('2024-06-06T14:42:42Z'));
  assert.ok(accessControlList.ipRanges);
});

When('I send a request to update an Access Control List', async () => {
  accessControlList = await accessControlListsApi.update({
    id: '01W4FFL35P4NC4K35SIPACL003',
    updateAccessControlListRequestBody: {
      name: 'My Access Control List 3',
    },
  });
});

Then('the response contains the Access Control List details with updated data', () => {
  assert.equal(accessControlList.id, '01W4FFL35P4NC4K35SIPACL003');
  assert.equal(accessControlList.name, 'My Access Control List 3');
  assert.deepEqual(accessControlList.createTime, new Date('2024-06-06T15:52:22Z'));
  assert.deepEqual(accessControlList.updateTime, new Date('2024-06-06T15:52:52.554735034Z'));
});

When('I send a request to delete an Access Control List', async () => {
  deleteAclResponse = await accessControlListsApi.delete({
    id: '01W4FFL35P4NC4K35SIPACL001',
  });
});

Then('the delete Access Control List response contains no data', () => {
  assert.deepEqual(deleteAclResponse, {} );
});

When('I send a request to add an IP Range to an Access Control List', async () => {
  ipRange = await accessControlListsApi.addIpRange({
    accessControlListId: '01W4FFL35P4NC4K35SIPACL001',
    addIpRangeRequestBody: {
      description: 'West wing',
      ipAddress: '10.0.1.1',
      range: 24,
    },
  });
});

Then('the response contains the created IP range associated to the Access Control List', () => {
  assert.equal(ipRange.id, '01W4FFL35P4NC4K35IPRANGE06');
  assert.equal(ipRange.accessControlListId, '01W4FFL35P4NC4K35SIPACL003');
  assert.equal(ipRange.description, 'West wing');
  assert.equal(ipRange.ipAddress, '10.0.1.1');
  assert.equal(ipRange.range, 24);
  assert.equal(ipRange.projectId, 'tinyfrog-jump-high-over-lilypadbasin');
  assert.deepEqual(ipRange.createTime, new Date('2024-06-06T15:56:26.70848666Z'));
  assert.equal(ipRange.updateTime, null);
});

When('I send a request to list the existing IP Ranges', async () => {
  listIpRangesResponse = await accessControlListsApi.listIpRanges({
    accessControlListId: '01W4FFL35P4NC4K35SIPACL002',
  });
});

Then('the response contains {string} IP Ranges', (expectedAnswer: string) => {
  const expectedIpRangesCount = parseInt(expectedAnswer, 10);
  assert.equal(listIpRangesResponse.data.length, expectedIpRangesCount);
});

When('I send a request to list all the IP Ranges', async () => {
  ipRangesList = [];
  for await (const ipRange of accessControlListsApi.listIpRanges({
    accessControlListId: '01W4FFL35P4NC4K35SIPACL002',
  })) {
    ipRangesList.push(ipRange);
  }
});

When('I iterate manually over the IP Ranges pages', async () => {
  ipRangesList = [];
  listIpRangesResponse = await accessControlListsApi.listIpRanges({
    accessControlListId: '01W4FFL35P4NC4K35SIPACL002',
  });
  ipRangesList.push(...listIpRangesResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listIpRangesResponse.hasNextPage) {
      listIpRangesResponse = await listIpRangesResponse.nextPage();
      ipRangesList.push(...listIpRangesResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the IP Ranges list contains {string} IP Ranges',  (expectedAnswer: string) => {
  const expectedIpRangesCount = parseInt(expectedAnswer, 10);
  assert.equal(ipRangesList.length, expectedIpRangesCount);
});

Then('the IP Ranges iteration result contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

When('I send a request to update an IP Range', async () => {
  ipRange = await accessControlListsApi.updateIpRange({
    accessControlListId: '01W4FFL35P4NC4K35SIPACL003',
    ipRangeId: '01W4FFL35P4NC4K35IPRANGE06',
    updateIpRangeRequestBody: {
      description: 'West wing - updated',
      ipAddress: '10.0.1.2',
      range: 16,
    },
  });
});

Then('the response contains the IP Range details with updated data', () => {
  assert.equal(ipRange.id, '01W4FFL35P4NC4K35IPRANGE06');
  assert.equal(ipRange.description, 'West wing - updated');
  assert.equal(ipRange.ipAddress, '10.0.1.2');
  assert.equal(ipRange.range, 16);
  assert.deepEqual(ipRange.createTime, new Date('2024-06-06T15:56:26Z'));
  assert.deepEqual(ipRange.updateTime, new Date('2024-06-06T15:58:07.295895288Z'));
});

When('I send a request to delete an IP Range', async () => {
  deleteIpRangeResponse = await accessControlListsApi.deleteIpRange({
    accessControlListId: '01W4FFL35P4NC4K35SIPACL003',
    ipRangeId: '01W4FFL35P4NC4K35IPRANGE06',
  });
});

Then('the delete IP Range response contains no data', () => {
  assert.deepEqual(deleteIpRangeResponse, {} );
});

When('I send a request to add ACLs to a SIP trunk [using the ACL service]', async () => {
  addedAclsList = await accessControlListsApi.addToTrunk({
    trunkId: '01W4FFL35P4NC4K35SIPTRUNK1',
    addAccessControlListToTrunkRequestBody: {
      accessControlListIds: [
        '01W4FFL35P4NC4K35TRUNKACL1',
      ],
    },
  });
});

Then('the response contains the list of ACLs added to the trunk [using the ACL service]', () => {
  assert.ok(addedAclsList.accessControlListIds);
  assert.equal(addedAclsList.accessControlListIds.length, 1);
});

When('I send a request to list the existing ACLs for a SIP Trunk [using the ACL service]', async () => {
  listAclIdsResponse = await accessControlListsApi.listForTrunk({
    trunkId: '01W4FFL35P4NC4K35SIPTRUNK1',
  });
});

Then('the response [from the ACL service] contains {string} ACLs for a SIP Trunk', (expectedAnswer: string) => {
  const expectedMessagesCount = parseInt(expectedAnswer, 10);
  assert.equal(listAclIdsResponse.data.length, expectedMessagesCount);
});

When('I send a request to list all the ACLs for a SIP Trunk [using the ACL service]', async () => {
  aclIdsList = [];
  for await (const acl of accessControlListsApi.listForTrunk({ trunkId: '01W4FFL35P4NC4K35SIPTRUNK1' })) {
    aclIdsList.push(acl);
  }
});

When('I iterate manually over the ACLs for a SIP Trunk pages [using the ACL service]', async () => {
  aclIdsList = [];
  listAclIdsResponse = await accessControlListsApi.listForTrunk({ trunkId: '01W4FFL35P4NC4K35SIPTRUNK1' });
  aclIdsList.push(...listAclIdsResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listAclIdsResponse.hasNextPage) {
      listAclIdsResponse = await listAclIdsResponse.nextPage();
      aclIdsList.push(...listAclIdsResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the ACLs list [from the ACL service] contains {string} ACLs for a SIP Trunk',  (expectedAnswer: string) => {
  const expectedAclIdsListCount = parseInt(expectedAnswer, 10);
  assert.equal(aclIdsList.length, expectedAclIdsListCount);
});

// eslint-disable-next-line max-len
Then('the ACLs for a SIP Trunk iteration result [using the ACL service] contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

When('I send a request to delete an ACL from a SIP trunk [using the ACL service]', async () => {
  deleteAclFromTrunkResponse = await accessControlListsApi.deleteFromTrunk({
    trunkId: '01W4FFL35P4NC4K35SIPTRUNK1',
    accessControlListId: '01W4FFL35P4NC4K35TRUNKACL1',
  });
});

Then('the delete ACL from a SIP trunk response [using the ACL service] contains no data', () => {
  assert.deepEqual(deleteAclFromTrunkResponse, {} );
});
