import { ElasticSipTrunking, ElasticSipTrunkingService, SipEndpointsApi } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let sipEndpointsApi: SipEndpointsApi;
let sipEndpoint: ElasticSipTrunking.SipEndpoint;
let listResponse: PageResult<ElasticSipTrunking.SipEndpoint>;
let sipEndpointsList: ElasticSipTrunking.SipEndpoint[];
let pagesIteration: number;
let deleteSipEndpointResponse: void;

Given('the Elastic SIP Trunking service "SIP Endpoints" is available', function () {
  const elasticSipTrunkingService = new ElasticSipTrunkingService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    elasticSipTrunkingHostname: 'http://localhost:3016',
  });
  sipEndpointsApi = elasticSipTrunkingService.sipEndpoints;
});

When('I send a request to create a SIP Endpoint', async () => {
  sipEndpoint = await sipEndpointsApi.create({
    sipTrunkId: '01W4FFL35P4NC4K35SIPTRUNK1',
    createSipEndpointRequestBody: {
      name: 'Capsule Corp Endpoint',
      address: '127.0.0.1',
      priority: 2,
    },
  });
});

Then('the SIP Endpoint is created', () => {
  assert.equal(sipEndpoint.id, '01W4FFL35P4NC4K35SIPENDP01');
  assert.equal(sipEndpoint.sipTrunkId, '01W4FFL35P4NC4K35SIPTRUNK1');
  assert.equal(sipEndpoint.name, 'Capsule Corp Endpoint');
  assert.equal(sipEndpoint.address, '127.0.0.1');
  assert.equal(sipEndpoint.port, 5060);
  assert.equal(sipEndpoint.transport, 'UDP');
  assert.equal(sipEndpoint.priority, 2);
  assert.equal(sipEndpoint.enabled, true);
  assert.deepEqual(sipEndpoint.createTime, new Date('2024-06-06T14:42:42.337854345Z'));
  assert.equal(sipEndpoint.updateTime, null);
});

When('I send a request to list the existing SIP Endpoints', async () => {
  listResponse = await sipEndpointsApi.list({
    sipTrunkId: '01W4FFL35P4NC4K35SIPTRUNK1',
  });
});

Then('the response contains {string} SIP Endpoints', (expectedAnswer: string) => {
  const expectedSipEndpointsCount = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedSipEndpointsCount);
});

When('I send a request to list all the SIP Endpoints', async () => {
  sipEndpointsList = [];
  for await (const sipEndpoint of sipEndpointsApi.list({ sipTrunkId: '01W4FFL35P4NC4K35SIPTRUNK1' })) {
    sipEndpointsList.push(sipEndpoint);
  }
});

When('I iterate manually over the SIP Endpoints pages', async () => {
  sipEndpointsList = [];
  listResponse = await sipEndpointsApi.list({ sipTrunkId: '01W4FFL35P4NC4K35SIPTRUNK1' });
  sipEndpointsList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      sipEndpointsList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the SIP Endpoints list contains {string} SIP Endpoints',  (expectedAnswer: string) => {
  const expectedSipEndpointsCount = parseInt(expectedAnswer, 10);
  assert.equal(sipEndpointsList.length, expectedSipEndpointsCount);
});

Then('the SIP Endpoints iteration result contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

When('I send a request to retrieve a SIP Endpoint', async () => {
  sipEndpoint = await sipEndpointsApi.get({
    sipTrunkId: '01W4FFL35P4NC4K35SIPTRUNK1',
    sipEndpointId: '01W4FFL35P4NC4K35SIPENDP01',
  });
});

Then('the response contains the SIP Endpoint details', () => {
  assert.equal(sipEndpoint.id, '01W4FFL35P4NC4K35SIPENDP01');
  assert.deepEqual(sipEndpoint.createTime, new Date('2024-06-06T14:42:42Z'));
});

When('I send a request to update a SIP Endpoint', async () => {
  sipEndpoint = await sipEndpointsApi.update({
    sipTrunkId: '01W4FFL35P4NC4K35SIPTRUNK1',
    sipEndpointId: '01W4FFL35P4NC4K35SIPENDP01',
    updateSipEndpointRequestBody: {
      name: 'Capsule Corp Endpoint - updated',
      address: '127.0.0.2',
      priority: 3,
      port: 5061,
      transport: 'TCP',
      enabled: false,
    },
  });
});

Then('the response contains the SIP Endpoint details with updated data', () => {
  assert.equal(sipEndpoint.id, '01W4FFL35P4NC4K35SIPENDP01');
  assert.equal(sipEndpoint.name, 'Capsule Corp Endpoint - updated');
  assert.equal(sipEndpoint.address, '127.0.0.2');
  assert.equal(sipEndpoint.port, 5061);
  assert.equal(sipEndpoint.transport, 'TCP');
  assert.equal(sipEndpoint.priority, 3);
  assert.equal(sipEndpoint.enabled, false);
  assert.deepEqual(sipEndpoint.createTime, new Date('2024-06-06T14:42:42Z'));
  assert.deepEqual(sipEndpoint.updateTime, new Date('2024-06-06T14:45:11.428052267Z'));
});

When('I send a request to delete a SIP Endpoint', async () => {
  deleteSipEndpointResponse = await sipEndpointsApi.delete({
    sipTrunkId: '01W4FFL35P4NC4K35SIPTRUNK1',
    sipEndpointId: '01W4FFL35P4NC4K35SIPENDP01',
  });
});

Then('the delete SIP Endpoint response contains no data', () => {
  assert.deepEqual(deleteSipEndpointResponse, {} );
});
