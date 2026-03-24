import { Given, Then, When } from '@cucumber/cucumber';
import { NumberLookupService, NumberLookup } from '../../../../src';
import * as assert from 'assert';

let numberLookupService: NumberLookupService;
let response: NumberLookup.NumberLookupResponse;

Given('the Number Lookup service is available', () => {
  numberLookupService = new NumberLookupService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    numberLookupHostname: 'http://localhost:3022',
  });
});

When('I send a request to lookup for a phone number with no additional features', async () => {
  response = await numberLookupService.lookup({
    numberLookupRequestBody: {
      number:  '+12016666666',
    },
  });
});

Then('the response contains the details of the phone number lookup with line details only', () => {
  assert.equal(response.countryCode, 'US');
  assert.equal(response.traceId, '84c1fd4063c38d9f3900d06e56542d48');
  assert.equal(response.number, '+12016666666');
  assert.equal(response.line?.carrier, 'T-Mobile USA');
  assert.equal(response.line?.type, 'Mobile');
  assert.equal(response.line?.mobileCountryCode, '310');
  assert.equal(response.line?.mobileNetworkCode, '260');
});

When('I send a request to lookup for a phone number with all the features', async () => {
  response = await numberLookupService.lookup({
    numberLookupRequestBody: {
      number:  '+12015555555',
      features: ['LineType', 'RND', 'SimSwap', 'VoIPDetection'],
      rndFeatureOptions: {
        contactDate: '2025-09-09',
      },
    },
  });
});

Then('the response contains the details of the phone number lookup with all the features', () => {
  assert.equal(response.countryCode, 'US');
  assert.equal(response.traceId, '5c817a6b7351d80a6b1d8007e5c145b8');
  assert.equal(response.number, '+12015555555');
  assert.equal(response.line?.carrier, 'AT&T');
  assert.equal(response.line?.type, 'Mobile');
  assert.equal(response.line?.mobileCountryCode, '310');
  assert.equal(response.line?.mobileNetworkCode, '070');
  assert.equal(response.line?.ported, true);
  assert.deepEqual(response.line?.portingDate, new Date('2010-08-07T23:45:49+00:00'));
  assert.equal(response.simSwap?.error?.status, 100);
  assert.equal(response.simSwap?.error?.title, 'Feature Disabled');
  assert.equal(response.simSwap?.error?.detail, 'SimSwap feature is currently disabled.');
  assert.equal(response.voIPDetection?.error?.status, 100);
  assert.equal(response.voIPDetection?.error?.title, 'Feature Disabled');
  assert.equal(response.voIPDetection?.error?.detail, 'VoIPDetection feature is currently disabled.');
  assert.equal(response.rnd?.error?.status, 100);
  assert.equal(response.rnd?.error?.title, 'Feature Disabled');
  assert.equal(response.rnd?.error?.detail, 'RND feature is currently disabled.');
});
