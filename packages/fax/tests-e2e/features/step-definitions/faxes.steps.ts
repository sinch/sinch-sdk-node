import { Given, When, Then } from '@cucumber/cucumber';
import { Fax, FaxService } from '../../../src';
import { FileBuffer, PageResult } from '@sinch/sdk-client';
import * as assert from 'assert';

let faxService: FaxService;
let listResponse: PageResult<Fax>;
const faxList: Fax[] = [];
let fax: Fax;
let fileBuffer: FileBuffer;
let deleteContentResponse: void;

Given('the Fax service is available', function () {
  faxService = new FaxService({
    projectId: 'projectId',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authBaseUrl: 'http://localhost:5039',
  });
  faxService.setBasePath('http://localhost:5045');
});

When('I send a request to list faxes', async function () {
  listResponse = await faxService.faxes.list({});
});

When('I send a request to list all the faxes', async function () {
  for await (const fax of faxService.faxes.list({})) {
    faxList.push(fax);
  }
});

When('I send a request to send a fax', async function () {
  fax = await faxService.faxes.send({
    sendFaxRequestBody: {
      to: '+1234567890',
      contentUrl: 'https://developers.sinch.com/fax/fax.pdf',
    },
  });
});

When('I send a request to retrieve a fax', async function () {
  fax = await faxService.faxes.get({
    id: 'FAXID',
  });
});

When('I send a request to download a fax content as PDF', async function () {
  fileBuffer = await faxService.faxes.downloadContent({
    id: 'FAXID',
  });
});

When('I send a request to delete a fax content on the server', async function () {
  deleteContentResponse = await faxService.faxes.deleteContent({
    id: 'FAXID',
  });
});

Then('the response contains {string} faxes', function (expectedAnswer: string) {
  const expectedFaxes = parseInt(expectedAnswer, 10);
  assert.strictEqual(listResponse.data.length, expectedFaxes);
});

Then('the faxes list contains {string} faxes', function (expectedAnswer: string) {
  const expectedFaxes = parseInt(expectedAnswer, 10);
  assert.strictEqual(faxList.length, expectedFaxes);
});

Then('the response contains a fax object', function () {
  assert.ok(fax.id);
});

Then('the response contains a PDF document', function () {
  assert.ok(fileBuffer.fileName);
});

Then('the response contains no data', function () {
  assert.deepEqual(deleteContentResponse, {});
});
