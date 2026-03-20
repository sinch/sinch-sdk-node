import { ElasticSipTrunkingService, CallBlockingRulesApi, ElasticSipTrunking } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let callBlockingRulesApi: CallBlockingRulesApi;
let callBlockingRule: ElasticSipTrunking.CallBlockingRule;
let callBlockingRulesResponse: PageResult<ElasticSipTrunking.CallBlockingRule>;
let callBlockingRulesList: ElasticSipTrunking.CallBlockingRule[];
let pagesIteration: number;
let deleteCallBlockingRuleResponse: void;

Given('the Elastic SIP Trunking service "Call Blocking Rules" is available', function () {
  const elasticSipTrunkingService = new ElasticSipTrunkingService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    elasticSipTrunkingHostname: 'http://localhost:3016',
  });
  callBlockingRulesApi = elasticSipTrunkingService.callBlockingRules;
});

When('I send a request to create a Call Blocking Rule', async () => {
  callBlockingRule = await callBlockingRulesApi.create({
    createCallBlockingRuleRequestBody: {
      name: 'Block calls from US',
      direction: 'INBOUND',
      callerCountry: 'US',
      callerMatch: '123',
    },
  });
});

Then('the Call Blocking Rule is created', () => {
  assert.equal(callBlockingRule.id, '01W4FFL35P4NC4K35BLOCKING03');
  assert.equal(callBlockingRule.name, 'Block calls from US');
  assert.equal(callBlockingRule.direction, 'inbound');
  assert.equal(callBlockingRule.callerCountry, 'US');
  assert.equal(callBlockingRule.callerMatch, '123');
  assert.equal(callBlockingRule.calleeCountry, null);
  assert.equal(callBlockingRule.calleeMatch, null);
  assert.deepEqual(callBlockingRule.createTime, new Date('2024-06-06T14:42:42.252663248Z'));
  assert.equal(callBlockingRule.updateTime, null);
  assert.equal(callBlockingRule.projectId, 'tinyfrog-jump-high-over-lilypadbasin');
});

When('I send a request to list the existing Call Blocking Rules', async () => {
  callBlockingRulesResponse = await callBlockingRulesApi.list({});
});

Then('the response contains {string} Call Blocking Rules', (expected: string) => {
  assert.equal(callBlockingRulesResponse.data.length, parseInt(expected, 10));
});

When('I send a request to list all the Call Blocking Rules', async () => {
  callBlockingRulesList = [];
  for await (const rule of callBlockingRulesApi.list({})) {
    callBlockingRulesList.push(rule);
  }
});

Then('the Call Blocking Rules list contains {string} Call Blocking Rules', (expected: string) => {
  assert.equal(callBlockingRulesList.length, parseInt(expected, 10));
});

When('I iterate manually over the Call Blocking Rules pages', async () => {
  callBlockingRulesList = [];
  callBlockingRulesResponse = await callBlockingRulesApi.list({});
  callBlockingRulesList.push(...callBlockingRulesResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (callBlockingRulesResponse.hasNextPage) {
      callBlockingRulesResponse = await callBlockingRulesResponse.nextPage();
      callBlockingRulesList.push(...callBlockingRulesResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the Call Blocking Rules iteration result contains the data from {string} pages', (expected: string) => {
  assert.equal(pagesIteration, parseInt(expected, 10));
});

When('I send a request to update a Call Blocking Rule', async () => {
  callBlockingRule = await callBlockingRulesApi.update({
    id: '01W4FFL35P4NC4K35BLOCKING03',
    updateCallBlockingRuleRequestBody: {
      name: 'Block calls from US - Updated',
      direction: 'INBOUND',
      callerCountry: 'US',
      callerMatch: '456',
    },
  });
});

Then('the response contains the Call Blocking Rule details with updated data', () => {
  assert.equal(callBlockingRule.name, 'Block calls from US - Updated');
});

When('I send a request to delete a Call Blocking Rule', async () => {
  deleteCallBlockingRuleResponse = await callBlockingRulesApi.delete({
    id: '01W4FFL35P4NC4K35BLOCKING03',
  });
});

Then('the delete Call Blocking Rule response contains no data', () => {
  assert.deepEqual(deleteCallBlockingRuleResponse, {});
});
