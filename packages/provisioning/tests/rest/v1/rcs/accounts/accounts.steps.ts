import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';
import { PageResult } from '@sinch/sdk-client';
import { Provisioning, ProvisioningService, RcsAccountsApi } from '../../../../../src';
import { mockserverHosts } from '../../../../e2e/hosts';

const PROJECT_ID = 'tinyfrog-jump-high-over-lilypadbasin';

let accountsApi: RcsAccountsApi;
let listResponse: PageResult<Provisioning.RcsAccountNotification>;
let activitiesList: Provisioning.RcsAccountNotification[];
let pagesIteration: number;
let comment: Provisioning.RcsComment;

Given('the Provisioning service "RCS Accounts" is available', function () {
  const provisioningService = new ProvisioningService({
    projectId: PROJECT_ID,
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: mockserverHosts.authHostname,
    provisioningHostname: mockserverHosts.provisioningHostname,
  });
  accountsApi = provisioningService.rcs.accounts;
});

When('I send a request to create an RCS account comment', async () => {
  comment = await accountsApi.createComment({
    rcsCommentCreateRequestBody: {
      comment: 'this is a comment',
    },
  });
});

Then('the RCS account comment is created', () => {
  assert.equal(comment.type, 'CREATED');
  assert.equal(comment.comment, 'this is a comment');
  assert.deepEqual(comment.created, new Date('2026-08-04T09:57:57.177Z'));
});

When('I send a request to list RCS account activities', async () => {
  listResponse = await accountsApi.listActivities({
    pageSize: 1,
  });
});

Then('the response contains the list of RCS account activities', () => {
  assert.equal(listResponse.data.length, 1);
  const firstActivity = listResponse.data[0];
  assert.equal(firstActivity.type, 'COMMENT_ADDED');
  assert.equal(firstActivity.comment, 'this is a comment');
  assert.equal(firstActivity.author, 'Provisioning API user');
  assert.deepEqual(firstActivity.created, new Date('2026-08-04T09:57:57.000Z'));
});

When('I send a request to list all the RCS account activities', async () => {
  activitiesList = [];
  for await (const item of accountsApi.listActivities({ pageSize: 1 })) {
    activitiesList.push(item);
  }
});

When('I iterate manually over the RCS account activities pages', async () => {
  activitiesList = [];
  listResponse = await accountsApi.listActivities({
    pageSize: 1,
  });
  activitiesList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      activitiesList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the RCS account activities list contains {string} activities', (expectedAnswer: string) => {
  const expectedActivitiesCount = parseInt(expectedAnswer, 10);
  assert.equal(activitiesList.length, expectedActivitiesCount);
});

Then(
  'the RCS account activities iteration result contains the data from {string} pages',
  (expectedAnswer: string) => {
    const expectedPagesCount = parseInt(expectedAnswer, 10);
    assert.equal(pagesIteration, expectedPagesCount);
  },
);
