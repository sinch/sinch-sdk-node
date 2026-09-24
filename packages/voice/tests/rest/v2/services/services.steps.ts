import { VoiceV2ServicesApi, VoiceService, Voice } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';
import { PageResult } from '@sinch/sdk-client';
import { mockserverHosts } from '../../../e2e/hosts';

let servicesApi: VoiceV2ServicesApi;
let createServiceResponse: Voice.v2.ServiceResponse;
let service: Voice.v2.ServiceResponse;
let listResponse: PageResult<Voice.v2.ServiceShortResponse>;
let servicesList: Voice.v2.ServiceShortResponse[];
let pagesIteration: number;
let deleteServiceResponse: void;

Given('the Voice-V2 service "Services" is available', () => {
  const voiceService = new VoiceService({
    applicationKey: 'appKey',
    applicationSecret: 'appSecret',
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: mockserverHosts.authHostname,
    voiceV2Hostname: mockserverHosts.voiceV2Hostname,
  });
  servicesApi = voiceService.v2.services;
});

When('I send a request to create a Voice-V2 service', async () => {
  createServiceResponse = await servicesApi.create({
    createServiceRequestBody: {
      name: 'Example service',
    },
  });
});

Then('the response contains the information about the Voice-V2 service created', () => {
  assert.equal(createServiceResponse.serviceId, '1a2b3c4d-5e6f-4789-a012-b3c4d5e6f789');
  assert.equal(createServiceResponse.projectId, 'c3d4e5f6-a7b8-4901-c234-d5e6f7a8b901');
  assert.deepEqual(createServiceResponse.createTime, new Date('2026-09-16T10:44:09Z'));
  assert.deepEqual(createServiceResponse.updateTime, new Date('2026-09-16T10:44:09Z'));
  assert.equal(createServiceResponse.name, 'Example service');
  assert.equal(createServiceResponse.description, '');
  assert.equal(createServiceResponse.isDefault, false);
});

When('I send a request to list Voice-V2 services', async () => {
  listResponse = await servicesApi.list({
    pageSize: 2,
  });
});

Then('the response contains {string} Voice-V2 services', (expectedAnswer: string) => {
  const expectedServicesCount = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedServicesCount);
});

When('I send a request to list all the Voice-V2 services', async () => {
  servicesList = [];
  for await (const listedService of servicesApi.list({ pageSize: 2 })) {
    servicesList.push(listedService);
  }
});

When('I iterate manually over the Voice-V2 services pages', async () => {
  servicesList = [];
  listResponse = await servicesApi.list({
    pageSize: 2,
  });
  servicesList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      servicesList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the services list contains {string} Voice-V2 services', (expectedAnswer: string) => {
  const expectedServicesCount = parseInt(expectedAnswer, 10);
  assert.equal(servicesList.length, expectedServicesCount);
});

Then(
  'the services iteration result contains the data from {string} Voice-V2 service pages',
  (expectedAnswer: string) => {
    const expectedPagesCount = parseInt(expectedAnswer, 10);
    assert.equal(pagesIteration, expectedPagesCount);
  },
);

When('I send a request to get Voice-V2 service details', async () => {
  service = await servicesApi.get({
    serviceId: '3c4d5e6f-7a8b-4901-c234-d5e6f7a8b901',
  });
});

Then('the response contains the Voice-V2 service details', () => {
  assert.equal(service.serviceId, '3c4d5e6f-7a8b-4901-c234-d5e6f7a8b901');
  assert.equal(service.projectId, 'c3d4e5f6-a7b8-4901-c234-d5e6f7a8b901');
  assert.deepEqual(service.createTime, new Date('2026-09-16T10:47:36Z'));
  assert.deepEqual(service.updateTime, new Date('2026-09-16T10:47:36Z'));
  assert.equal(service.name, 'Example service 2');
  assert.equal(service.description, '');
  assert.equal(service.isDefault, false);
  assert.deepEqual(service.callBehavior, {
    type: 'NONE',
  });
});

When('I send a request to update a Voice-V2 service', async () => {
  service = await servicesApi.update({
    serviceId: '3c4d5e6f-7a8b-4901-c234-d5e6f7a8b901',
    updateServiceRequestBody: {
      description: 'Service with webhooks',
      callBehavior: {
        type: 'WEBHOOK',
        webhook: {
          url: 'https://example.com/webhook',
          fallbackUrl: 'https://example.com/fallback',
        },
      },
    },
  });
});

Then('the response contains the information about the Voice-V2 service updated', () => {
  assert.equal(service.serviceId, '3c4d5e6f-7a8b-4901-c234-d5e6f7a8b901');
  assert.equal(service.projectId, 'c3d4e5f6-a7b8-4901-c234-d5e6f7a8b901');
  assert.deepEqual(service.createTime, new Date('2026-09-16T10:47:36Z'));
  assert.deepEqual(service.updateTime, new Date('2026-09-16T10:51:55Z'));
  assert.equal(service.name, 'Example service 2');
  assert.equal(service.description, 'Service with webhooks');
  assert.equal(service.isDefault, false);
  assert.deepEqual(service.callBehavior, {
    type: 'WEBHOOK',
    webhook: {
      url: 'https://example.com/webhook',
      fallbackUrl: 'https://example.com/fallback',
    },
  });
});

When('I send a request to delete a Voice-V2 service', async () => {
  deleteServiceResponse = await servicesApi.delete({
    serviceId: '3c4d5e6f-7a8b-4901-c234-d5e6f7a8b901',
  });
});

Then('the response confirms the Voice-V2 service was deleted', () => {
  assert.deepEqual(deleteServiceResponse, {});
});
