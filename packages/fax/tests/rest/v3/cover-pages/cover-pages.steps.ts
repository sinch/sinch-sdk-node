import { CoverPagesApi, FaxService, Fax } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let coverPagesApi: CoverPagesApi;
let coverPage: Fax.CoverPage;
let listResponse: PageResult<Fax.CoverPage>;
let coverPagesList: Fax.CoverPage[];
let pagesIteration: number;
let deleteCoverPageResponse: void;

Given('the Fax service "CoverPages" is available', () => {
  const faxService = new FaxService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    faxHostname: 'http://localhost:3012',
  });
  coverPagesApi = faxService.coverPages;
});

When('I send a request to add a new Fax Cover Page to a service', async () => {
  coverPage = await coverPagesApi.add({
    serviceId: '01W4FFL35P4NC4K35FAXSERVICE',
    addCoverPageRequestBody: {
      name: 'My cover page for e2e tests',
      file: {
        fileContent: 'V2VsY29tZSB0byBTaW5jaCE=',
        fileType: 'PDF',
      },
    },
  });
});

Then('the Fax Cover Page is created', () => {
  assert.equal(coverPage.id, '01W4FFL35P4NC4K35COVERPAGE1');
  assert.equal(coverPage.name, 'My cover page for e2e tests');
  assert.equal(coverPage.projectId, '123coffee-dada-beef-cafe-baadc0de5678');
  assert.equal(coverPage.serviceId, '01W4FFL35P4NC4K35FAXSERVICE');
  assert.deepEqual(coverPage.createdTime, new Date('2025-06-06T15:21:16Z'));
  assert.deepEqual(coverPage.updatedTime, new Date('2025-06-06T15:21:16Z'));
  assert.equal(coverPage.file.fileContent, 'V2VsY29tZSB0byBTaW5jaCE=');
  assert.equal(coverPage.file.fileType, 'application/pdf');
});

When('I send a request to retrieve a Fax Cover Page', async () => {
  coverPage = await coverPagesApi.get({
    serviceId: '01W4FFL35P4NC4K35FAXSERVICE',
    coverPageId: '01W4FFL35P4NC4K35COVERPAGE1',
  });
});

Then('the response contains the Fax Cover Page details', () => {
  assert.equal(coverPage.id, '01W4FFL35P4NC4K35COVERPAGE1');
  assert.equal(coverPage.name, 'My cover page for e2e tests');
  assert.equal(coverPage.projectId, '123coffee-dada-beef-cafe-baadc0de5678');
  assert.equal(coverPage.serviceId, '01W4FFL35P4NC4K35FAXSERVICE');
  assert.deepEqual(coverPage.createdTime, new Date('2025-06-06T15:21:16Z'));
  assert.deepEqual(coverPage.updatedTime, new Date('2025-06-06T15:21:16Z'));
  assert.equal(coverPage.file.fileContent, 'V2VsY29tZSB0byBTaW5jaCE=');
  assert.equal(coverPage.file.fileType, 'application/pdf');
});

When('I send a request to list the Fax Cover Pages', async () => {
  listResponse = await coverPagesApi.list({
    serviceId: '01W4FFL35P4NC4K35FAXSERVICE',
    pageSize: 2,
  });
});

Then('the response contains {string} Fax Cover Pages', (expectedAnswer: string) => {
  const expectedCoverPagesNumber = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedCoverPagesNumber);
});

When('I send a request to list all the Fax Cover Pages', async () => {
  coverPagesList = [];
  for await (const coverPage of coverPagesApi.list({
    serviceId: '01W4FFL35P4NC4K35FAXSERVICE',
    pageSize: 2,
  })) {
    coverPagesList.push(coverPage);
  }
});

When('I iterate manually over the Fax Cover Pages pages', async () => {
  coverPagesList = [];
  listResponse = await coverPagesApi.list({
    serviceId: '01W4FFL35P4NC4K35FAXSERVICE',
    pageSize: 2,
  });
  coverPagesList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      coverPagesList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the Fax Cover Pages list contains {string} Fax Cover Pages',  (expectedAnswer: string) => {
  const expectedCoverPagesNumber = parseInt(expectedAnswer, 10);
  assert.equal(coverPagesList.length, expectedCoverPagesNumber);
});

Then('the Fax Cover Pages iteration result contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

When('I send a request to remove a Fax Cover Page', async () => {
  deleteCoverPageResponse = await coverPagesApi.delete({
    serviceId: '01W4FFL35P4NC4K35FAXSERVICE',
    coverPageId: '01W4FFL35P4NC4K35COVERPAGE1',
  });
});

Then('the delete Fax Cover Page response contains no data', function () {
  assert.deepEqual(deleteCoverPageResponse, {});
});
