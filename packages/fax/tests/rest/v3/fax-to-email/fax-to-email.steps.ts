import { FaxToEmailApi, Fax, FaxService } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let faxToEmailApi: FaxToEmailApi;
let listEmailsResponse: PageResult<string>;
const emailsList: string[] = [];
let listFaxEmails: PageResult<Fax.Email>;
const faxEmailsList: Fax.Email[] = [];
let email: Fax.Email;
let deleteEmailResponse: void;
let listNumbersResponse: PageResult<Fax.ServicePhoneNumber>;
const numbersList: Fax.ServicePhoneNumber[] = [];

Given('the Fax service "Emails" is available', () => {
  const faxService = new FaxService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    faxHostname: 'http://localhost:3012',
  });
  faxToEmailApi = faxService.faxToEmail;
});

When('I send a request to list the emails associated to a phone number via the "Emails" Service', async () => {
  listEmailsResponse = await faxToEmailApi.listForNumber({
    serviceId: '01W4FFL35P4NC4K35FAXSERVICE',
    phoneNumber: '+12014444444',
  });
});

// eslint-disable-next-line max-len
Then('the "Emails" Service response contains {string} emails associated to the phone number', (expectedAnswer: string) => {
  // To implement
  const expectedNumbers = parseInt(expectedAnswer, 10);
  assert.equal(listEmailsResponse.data.length, expectedNumbers);
});

When('I send a request to list all the emails associated to a phone number via the "Emails" Service', async () => {
  for await (const email of faxToEmailApi.listForNumber({
    serviceId: '01W4FFL35P4NC4K35FAXSERVICE',
    phoneNumber: '+12014444444' })
  ) {
    emailsList.push(email);
  }
});

// eslint-disable-next-line max-len
Then('the emails list from the "Emails" Service contains {string} emails associated to a phone number', (expectedAnswer: string) => {
  // To implement
  const expectedNumbers = parseInt(expectedAnswer, 10);
  assert.equal(emailsList.length, expectedNumbers);
});

When('I send a request to list the emails associated to the project', async () => {
  listFaxEmails = await faxToEmailApi.list({});
});

Then('the response contains {string} emails associated to the project', (expectedAnswer: string) => {
  const expectedNumbers = parseInt(expectedAnswer, 10);
  assert.equal(listFaxEmails.data.length, expectedNumbers);
});

When('I send a request to list all the emails associated to the project', async () => {
  for await (const email of faxToEmailApi.list({})) {
    faxEmailsList.push(email);
  }
});

Then('the emails list contains {string} emails associated to the project', (expectedAnswer: string) => {
  const expectedNumbers = parseInt(expectedAnswer, 10);
  assert.equal(faxEmailsList.length, expectedNumbers);
});

When('I send a request to add a new email to the project', async () => {
  email = await faxToEmailApi.addToNumbers({
    emailRequestBody : {
      email: 'spaceship@galaxy.far.far.away',
      phoneNumbers: ['+12016666666'],
    },
  });
});

Then('the response contains the added email', () => {
  assert.equal(email.email, 'spaceship@galaxy.far.far.away');
  assert.deepEqual(email.phoneNumbers, ['+12016666666']);
  assert.equal(email.projectId, '123c0ffee-dada-beef-cafe-baadc0de5678');
});

When('I send a request to update the phone numbers associated to an email', async () => {
  email = await faxToEmailApi.update({
    email: 'spaceship@galaxy.far.far.away',
    updateEmailRequestBody: {
      phoneNumbers: [
        '+12016666666',
        '+12017777777',
      ],
    },
  });
});

Then('the response contains the updated email', () => {
  assert.equal(email.email, 'spaceship@galaxy.far.far.away');
  assert.deepEqual(email.phoneNumbers, ['+12016666666', '+12017777777']);
  assert.equal(email.projectId, '123c0ffee-dada-beef-cafe-baadc0de5678');
});

When('I send a request to delete an email from the project', async () => {
  deleteEmailResponse = await faxToEmailApi.delete({
    email: 'spaceship@galaxy.far.far.away',
  });
});

Then('the delete email response contains no data', () => {
  assert.deepEqual(deleteEmailResponse, {});
});

When('I send a request to list the phone numbers associated to an email', async () => {
  listNumbersResponse = await faxToEmailApi.listNumbers({
    email: 'cookie.monster@nom.nom',
    pageSize: 2,
  });
});

Then('the response contains {string} phone numbers associated to the email', (expectedAnswer: string) => {
  const expectedNumbers = parseInt(expectedAnswer, 10);
  assert.strictEqual(listNumbersResponse.data.length, expectedNumbers);
});

When('I send a request to list all the phone numbers associated to an email', async () => {
  for await (const number of faxToEmailApi.listNumbers({ email: 'cookie.monster@nom.nom' })) {
    numbersList.push(number);
  }
});

Then('the phone numbers list contains {string} phone numbers associated to the email', (expectedAnswer: string) => {
  const expectedNumbers = parseInt(expectedAnswer, 10);
  assert.strictEqual(numbersList.length, expectedNumbers);
});
