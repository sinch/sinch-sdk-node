import { FaxService, Fax, ServicesApi } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let servicesApi: ServicesApi;
let createServiceResponse: Fax.ServiceResponse;
let listResponse: PageResult<Fax.ServiceResponse>;
const servicesList: Fax.ServiceResponse[] = [];
let service: Fax.ServiceResponse;
let deleteServiceResponse: void;
let listNumbersResponse: PageResult<Fax.ServicePhoneNumber>;
const numbersList: Fax.ServicePhoneNumber[] = [];
let listEmailsResponse: PageResult<string>;
const emailsList: string[] = [];

Given('the Fax service "Services" is available', () => {
  const faxService = new FaxService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    faxHostname: 'http://localhost:3012',
  });
  servicesApi = faxService.services;
});

When('I send a request to create a new service', async () => {
  createServiceResponse = await servicesApi.create({
    createServiceRequestBody: {
      name: 'Fax service for e2e tests',
      incomingWebhookUrl: 'https://my-callback-server.com/fax',
      webhookContentType: 'application/json',
      defaultForProject: false,
      defaultFrom: '+12014444444',
      numberOfRetries: 2,
      retryDelaySeconds: 30,
      imageConversionMethod: 'MONOCHROME',
      saveInboundFaxDocuments: true,
      saveOutboundFaxDocuments: true,
    },
  });
});

Then('the service is created', () => {
  assert.equal(createServiceResponse.id, '01W4FFL35P4NC4K35FAXSERVICE');
});

When('I send a request to list the existing services', async () => {
  listResponse = await servicesApi.list({
    pageSize: 2,
  });
});

Then('the response contains {string} services', (expectedAnswer: string) => {
  const expectedServices = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedServices);
});

When('I send a request to list all the services', async () => {
  for await (const service of servicesApi.list({ pageSize: 2 })) {
    servicesList.push(service);
  }
});

Then('the services list contains {string} services',  (expectedAnswer: string) => {
  const expectedServices = parseInt(expectedAnswer, 10);
  assert.equal(servicesList.length, expectedServices);
});

When('I send a request to retrieve a service', async () => {
  service = await servicesApi.get({
    serviceId: '01W4FFL35P4NC4K35FAXSERVICE',
  });
});

Then('the response contains a service object', () => {
  assert.equal('01W4FFL35P4NC4K35FAXSERVICE', service.id);
  assert.equal('application/json', service.webhookContentType);
  assert.equal('+12014444444', service.defaultFrom);
  assert.equal(2, service.numberOfRetries);
  assert.equal(30, service.retryDelaySeconds);
  assert.equal('MONOCHROME', service.imageConversionMethod);
  assert.equal('123coffee-dada-beef-cafe-baadc0de5678', service.projectId);
  assert.equal(false, service.defaultForProject);
  assert.equal(true, service.saveInboundFaxDocuments);
  assert.equal(true, service.saveOutboundFaxDocuments);
  assert.equal('Fax service for e2e tests', service.name);
  assert.equal('https://my-callback-server.com/fax', service.incomingWebhookUrl);
});

When('I send a request to update a service', async () => {
  service = await servicesApi.update({
    serviceId: '01W4FFL35P4NC4K35FAXSERVICE',
    updateServiceRequestBody: {
      name: 'Updated Fax service name',
      webhookContentType: 'multipart/form-data',
      defaultForProject: true,
      numberOfRetries: 3,
      retryDelaySeconds: 60,
      imageConversionMethod: 'HALFTONE',
      saveOutboundFaxDocuments: false,
      saveInboundFaxDocuments: false,
    },
  });
});

Then('the response contains a service with updated parameters', () => {
  assert.equal('01W4FFL35P4NC4K35FAXSERVICE', service.id);
  assert.equal('multipart/form-data', service.webhookContentType);
  assert.equal(3, service.numberOfRetries);
  assert.equal(60, service.retryDelaySeconds);
  assert.equal('HALFTONE', service.imageConversionMethod);
  assert.equal(true, service.defaultForProject);
  assert.equal(false, service.saveInboundFaxDocuments);
  assert.equal(false, service.saveOutboundFaxDocuments);
  assert.equal('Updated Fax service name', service.name);
});

When('I send a request to remove a service', async () => {
  deleteServiceResponse = await servicesApi.delete({
    serviceId: '01W4FFL35P4NC4K35FAXSERVICE',
  });
});

Then('the delete service response contains no data', function () {
  assert.deepEqual(deleteServiceResponse, {});
});

When('I send a request to list the numbers associated to a fax service', async () => {
  listNumbersResponse = await servicesApi.listNumbers({
    serviceId: '01W4FFL35P4NC4K35FAXSERVICE',
  });
});

Then('the response contains {string} numbers associated to the fax service', (expectedAnswer: string) => {
  const expectedNumbers = parseInt(expectedAnswer, 10);
  assert.strictEqual(listNumbersResponse.data.length, expectedNumbers);
});

When('I send a request to list all the numbers associated to a fax service', async () => {
  for await (const number of servicesApi.listNumbers({ serviceId: '01W4FFL35P4NC4K35FAXSERVICE' })) {
    numbersList.push(number);
  }
});

Then('the phone numbers list contains {string} numbers associated to the fax service', (expectedAnswer: string) => {
  const expectedNumbers = parseInt(expectedAnswer, 10);
  assert.strictEqual(numbersList.length, expectedNumbers);
});

When('I send a request to list the emails associated to a phone number', async () => {
  listEmailsResponse = await servicesApi.listEmailsForNumber({
    serviceId: '01W4FFL35P4NC4K35FAXSERVICE',
    phoneNumber: '+12014444444',
  });
});

Then('the response contains {string} emails associated to the phone number', (expectedAnswer: string) => {
  const expectedNumbers = parseInt(expectedAnswer, 10);
  assert.strictEqual(listEmailsResponse.data.length, expectedNumbers);
});

When('I send a request to list all the emails associated to a phone number', async () => {
  for await (const email of servicesApi.listEmailsForNumber({
    serviceId: '01W4FFL35P4NC4K35FAXSERVICE',
    phoneNumber: '+12014444444' })
  ) {
    emailsList.push(email);
  }
});

Then('the emails list contains {string} emails associated to a phone number', (expectedAnswer: string) => {
  const expectedNumbers = parseInt(expectedAnswer, 10);
  assert.strictEqual(emailsList.length, expectedNumbers);
});
