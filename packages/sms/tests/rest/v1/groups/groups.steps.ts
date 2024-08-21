import { GroupsApi, SmsService, Sms } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let groupsApi: GroupsApi;
let group: Sms.Group;
let listResponse: PageResult<Sms.Group>;
let groupsList: Sms.Group[];
let pagesIteration: number;
let deleteGroupResponse: void;
let phoneNumbersList: string[];

Given('the SMS service "Groups" is available', () => {
  const smsService = new SmsService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    smsHostname: 'http://localhost:3017',
  });
  groupsApi = smsService.groups;
});

When('I send a request to create an SMS group', async () => {
  group = await groupsApi.create({
    createGroupRequestBody: {
      name: 'Group master',
      members: [
        '+12017778888',
        '+12018887777',
      ],
      child_groups: [
        '01W4FFL35P4NC4K35SUBGROUP1',
      ],
    },
  });
});

Then('the response contains the SMS group details', () => {
  assert.equal(group.id, '01W4FFL35P4NC4K35SMSGROUP1');
  assert.equal(group.name, 'Group master');
  assert.equal(group.size, 2);
  assert.deepEqual(group.created_at, new Date('2024-06-06T08:59:22.156Z'));
  assert.deepEqual(group.modified_at, new Date('2024-06-06T08:59:22.156Z'));
  assert.ok(group.child_groups);
  assert.equal(group.child_groups[0], '01W4FFL35P4NC4K35SUBGROUP1');
});

When('I send a request to list the existing SMS groups', async () => {
  listResponse = await groupsApi.list({
    page_size: 2,
  });
});

Then('the response contains {string} SMS groups', (expectedAnswer: string) => {
  const expectedGroupsCount = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedGroupsCount);
});

When('I send a request to list all the SMS groups', async () => {
  groupsList = [];
  for await (const group of groupsApi.list({ page_size: 2 })) {
    groupsList.push(group);
  }
});

When('I iterate manually over the SMS groups pages', async () => {
  groupsList = [];
  listResponse = await groupsApi.list({
    page_size: 2,
  });
  groupsList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      groupsList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the SMS groups list contains {string} SMS groups',  (expectedAnswer: string) => {
  const expectedGroupsCount = parseInt(expectedAnswer, 10);
  assert.equal(groupsList.length, expectedGroupsCount);
});

Then('the SMS groups iteration result contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});

When('I send a request to retrieve an SMS group', async () => {
  group = await groupsApi.get({
    group_id: '01W4FFL35P4NC4K35SMSGROUP1',
  });
});

When('I send a request to update an SMS group', async () => {
  group = await groupsApi.update({
    group_id: '01W4FFL35P4NC4K35SMSGROUP1',
    updateGroupRequestBody: {
      name: null,
      add: [
        '+12017771111',
        '+12017772222',
      ],
      remove: [
        '+12017773333',
        '+12017774444',
      ],
      add_from_group: '01W4FFL35P4NC4K35SMSGROUP2',
      remove_from_group: '01W4FFL35P4NC4K35SMSGROUP3',
    },
  });
});

Then('the response contains the updated SMS group details', () => {
  assert.equal(group.id, '01W4FFL35P4NC4K35SMSGROUP1');
  assert.equal(group.name, undefined);
  assert.equal(group.size, 6);
  assert.deepEqual(group.created_at, new Date('2024-06-06T08:59:22.156Z'));
  assert.deepEqual(group.modified_at, new Date('2024-06-06T09:19:58.147Z'));
  assert.ok(group.child_groups);
  assert.equal(group.child_groups[0], '01W4FFL35P4NC4K35SUBGROUP1');
});

When('I send a request to replace an SMS group', async () => {
  group = await groupsApi.replace({
    group_id: '01W4FFL35P4NC4K35SMSGROUP1',
    replaceGroupRequestBody: {
      name: 'Replacement group',
      members: [
        '+12018881111',
        '+12018882222',
        '+12018883333',
      ],
    },
  });
});

Then('the response contains the replaced SMS group details', () => {
  assert.equal(group.id, '01W4FFL35P4NC4K35SMSGROUP1');
  assert.equal(group.name, 'Replacement group');
  assert.equal(group.size, 3);
  assert.deepEqual(group.created_at, new Date('2024-06-06T08:59:22.156Z'));
  assert.deepEqual(group.modified_at, new Date('2024-08-21T09:39:36.679Z'));
  assert.ok(group.child_groups);
  assert.equal(group.child_groups[0], '01W4FFL35P4NC4K35SUBGROUP1');
});

When('I send a request to delete an SMS group', async () => {
  deleteGroupResponse = await groupsApi.delete({
    group_id: '01W4FFL35P4NC4K35SMSGROUP1',
  });
});

Then('the delete SMS group response contains no data', () => {
  assert.deepEqual(deleteGroupResponse, {} );
});

When('I send a request to list the members of an SMS group', async () => {
  phoneNumbersList = await groupsApi.listMembers({
    group_id: '01W4FFL35P4NC4K35SMSGROUP1',
  });
});

Then('the response contains the phone numbers of the SMS group', () => {
  assert.ok(phoneNumbersList);
  assert.equal(phoneNumbersList[0], '12018881111');
  assert.equal(phoneNumbersList[1], '12018882222');
  assert.equal(phoneNumbersList[2], '12018883333');
});
