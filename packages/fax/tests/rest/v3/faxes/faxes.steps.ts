import { Given, When, Then } from '@cucumber/cucumber';
import { FileBuffer, PageResult } from '@sinch/sdk-client';
import * as assert from 'assert';
import { FaxService, Fax, FaxesApi } from '../../../../src';

let faxesApi: FaxesApi;
let listResponse: PageResult<Fax.Fax>;
const faxList: Fax.Fax[] = [];
let sendFaxResponse: Fax.Fax[];
let fax: Fax.Fax;
let fileBuffer: FileBuffer;
let deleteContentResponse: void;

Given('the Fax service "Faxes" is available', () => {
  const faxService = new FaxService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    faxHostname: 'http://localhost:3012',
  });
  faxesApi = faxService.faxes;
});

When('I send a fax with a contentUrl only to a single recipient', async () => {
  sendFaxResponse = await faxesApi.send({
    sendFaxRequestBody: {
      to: '+12015555555',
      contentUrl: 'https://developers.sinch.com/fax/fax.pdf',
    },
  });
});

// eslint-disable-next-line max-len
Then('the response contains a list of fax objects with a single element received from a multipart-form-data request with contentUrl only', () => {
  assert.equal(sendFaxResponse.length, 1);
  assert.equal('01W4FFL35P4NC4K35URLSINGLE1', sendFaxResponse[0].id);
});

When('I send a fax with a contentUrl only to multiple recipients', async () => {
  sendFaxResponse = await faxesApi.send({
    sendFaxRequestBody: {
      to: ['+12015555555', '+12016666666'],
      contentUrl: 'https://developers.sinch.com/fax/fax.pdf',
    },
  });
});

// eslint-disable-next-line max-len
Then('the response contains a list of fax objects with multiple elements received from a multipart-form-data request with contentUrl only', () => {
  assert.equal(sendFaxResponse.length, 2);
  assert.equal('01W4FFL35P4NC4K35URLMULTI01', sendFaxResponse[0].id);
  assert.equal('01W4FFL35P4NC4K35URLMULTI02', sendFaxResponse[1].id);
});

When('I send a fax with a contentUrl and a binary file attachment to a single recipient', async () => {
  sendFaxResponse = await faxesApi.send({
    sendFaxRequestBody: {
      to: '+12015555555',
      contentUrl: 'https://developers.sinch.com/fax/fax.pdf',
      filePaths: ['./tests/e2e/resources/sinch-logo.png'],
    },
  });
});

// eslint-disable-next-line max-len
Then('the response contains a list of fax objects with a single element received from a multipart-form-data request', () => {
  assert.equal(sendFaxResponse.length, 1);
  assert.equal('01W4FFL35P4NC4K35BINSINGLE1', sendFaxResponse[0].id);
});

When('I send a fax with a contentUrl and a binary file attachment to multiple recipients', async () => {
  sendFaxResponse = await faxesApi.send({
    sendFaxRequestBody: {
      to: ['+12015555555', '+12016666666'],
      contentUrl: 'https://developers.sinch.com/fax/fax.pdf',
      filePaths: ['./tests/e2e/resources/sinch-logo.png'],
    },
  });
});

// eslint-disable-next-line max-len
Then('the response contains a list of fax objects with multiple elements received from a multipart-form-data request', () => {
  assert.equal(sendFaxResponse.length, 2);
  assert.equal('01W4FFL35P4NC4K35BINMULTI01', sendFaxResponse[0].id);
  assert.equal('01W4FFL35P4NC4K35BINMULTI02', sendFaxResponse[1].id);
});

When('I send a fax with a contentUrl and a base64 file encoded to a single recipient', async () => {
  sendFaxResponse = await faxesApi.send({
    sendFaxRequestBody: {
      to: '+12015555555',
      contentUrl: 'https://developers.sinch.com/fax/fax.pdf',
      files: [
        {
          file: 'WSdhIGRlcyBqb3VycywgZmF1dCBwYXMgbSdjaGVyY2hlciAhIEV0IHknYSBkZXMgam91cnMgdG91cyBsZXMgam91cnMgIQ==',
          fileType: 'PDF',
        },
        {
          file: 'UXVhbmQgbGUgdHJvbGwgcGFybGUsIGwnaG9tbWUgYXZpc8OpIGwnw6ljb3V0ZQ==',
          fileType: 'PDF',
        },
      ],
    },
  });
});

// eslint-disable-next-line max-len
Then('the response contains a list of fax objects with a single element received from an application-json request', () => {
  assert.equal(sendFaxResponse.length, 1);
  assert.equal('01W4FFL35P4NC4K35B64SINGLE1', sendFaxResponse[0].id);
});

When('I send a fax with a contentUrl and a base64 file encoded to multiple recipients', async () => {
  sendFaxResponse = await faxesApi.send({
    sendFaxRequestBody: {
      to: ['+12015555555', '+12016666666'],
      contentUrl: 'https://developers.sinch.com/fax/fax.pdf',
      files: [
        {
          file: 'WSdhIGRlcyBqb3VycywgZmF1dCBwYXMgbSdjaGVyY2hlciAhIEV0IHknYSBkZXMgam91cnMgdG91cyBsZXMgam91cnMgIQ==',
          fileType: 'PDF',
        },
        {
          file: 'UXVhbmQgbGUgdHJvbGwgcGFybGUsIGwnaG9tbWUgYXZpc8OpIGwnw6ljb3V0ZQ==',
          fileType: 'PDF',
        },
      ],
    },
  });
});

// eslint-disable-next-line max-len
Then('the response contains a list of fax objects with multiple elements received from an application-json request', () => {
  assert.equal(sendFaxResponse.length, 2);
  assert.equal('01W4FFL35P4NC4K35B64MULTI01', sendFaxResponse[0].id);
  assert.equal('01W4FFL35P4NC4K35B64MULTI02', sendFaxResponse[1].id);
});

When('I retrieve a fax', async () => {
  fax = await faxesApi.get({
    id: '01W4FFL35P4NC4K35CR3P35M1N1',
  });
});

Then('the response contains a fax object', () => {
  assert.equal('01W4FFL35P4NC4K35CR3P35M1N1', fax.id);
  assert.equal('OUTBOUND', fax.direction);
  assert.equal('+12014444444', fax.from);
  assert.equal('+12015555555', fax.to);
  assert.equal(1, fax.numberOfPages);
  assert.equal('COMPLETED', fax.status);
  assert.equal('America/New_York', fax.headerTimeZone);
  assert.equal(60, fax.retryDelaySeconds);
  assert.equal('multipart/form-data', fax.callbackUrlContentType);
  assert.equal('0.07', (fax as any).pricePerPage);
  assert.equal('123coffee-dada-beef-cafe-baadc0de5678', fax.projectId);
  assert.equal('01K1TTENC4TSJ0LLYJ1GGLYJU1Y', fax.serviceId);
  assert.equal('USD', fax.price?.currencyCode);
  assert.equal('0.07', fax.price?.amount);
  assert.equal(3, fax.maxRetries);
  assert.equal(new Date('2024-06-06T14:42:42Z').getTime(), fax.createTime?.getTime());
  assert.equal(new Date('2024-06-06T14:43:17Z').getTime(), fax.completedTime?.getTime());
  assert.equal(true, fax.headerPageNumbers);
  assert.equal('https://developers.sinch.com/fax/fax.pdf', fax.contentUrl?.[0]);
  assert.equal('MONOCHROME', fax.imageConversionMethod);
  assert.equal(true, fax.hasFile);
});

When('I send a request to list faxes', async () => {
  listResponse = await faxesApi.list({});
});

Then('the response contains {string} faxes', (expectedAnswer: string) => {
  const expectedFaxes = parseInt(expectedAnswer, 10);
  assert.strictEqual(listResponse.data.length, expectedFaxes);
});

When('I send a request to list all the faxes', async () => {
  for await (const fax of faxesApi.list({})) {
    faxList.push(fax);
  }
});

Then('the faxes list contains {string} faxes', (expectedAnswer: string) => {
  const expectedFaxes = parseInt(expectedAnswer, 10);
  assert.strictEqual(faxList.length, expectedFaxes);
});

When('I send a request to download a fax content as PDF', async () => {
  fileBuffer = await faxesApi.downloadContent({
    id: '01W4FFL35P4NC4K35CR3P35DWLD',
  });
});

Then('the response contains a PDF document', () => {
  assert.equal(fileBuffer.fileName, '01W4FFL35P4NC4K35CR3P35DWLD.pdf');
});

When('I send a request to delete a fax content on the server', async () => {
  deleteContentResponse = await faxesApi.deleteContent({
    id: '01W4FFL35P4NC4K35CR3P35DEL0',
  });
});

Then('the response contains no data', () => {
  assert.deepEqual(deleteContentResponse, {});
});
