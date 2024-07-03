import { Given, Then, When } from '@cucumber/cucumber';
import { CallbacksApi, NumbersService, Numbers } from '../../../../src';
import * as assert from 'assert';

let callbackConfigurationApi: CallbacksApi;
let callbackConfiguration: Numbers.CallbackConfiguration;
let error: any;
Given('the Numbers service "Callback Configuration" is available', function () {
  const numbersService = new NumbersService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    numbersHostname: 'http://localhost:3013',
  });
  callbackConfigurationApi = numbersService.callbacks;
});

When('I send a request to retrieve the callback configuration', async () => {
  callbackConfiguration = await callbackConfigurationApi.get({});
});

Then('the response contains the project\'s callback configuration', () => {
  assert.equal(callbackConfiguration.projectId, '12c0ffee-dada-beef-cafe-baadc0de5678');
  assert.equal(callbackConfiguration.hmacSecret, '0default-pass-word-*max-36characters');
});

When('I send a request to update the callback configuration with the secret {}', async (hmacSecret: string) => {
  try {
    callbackConfiguration = await callbackConfigurationApi.update({
      updateCallbackConfigurationRequestBody: {
        hmacSecret,
      },
    });
  } catch (e) {
    error = e;
  }
});

Then('the response contains the updated project\'s callback configuration', () => {
  assert.equal(callbackConfiguration.projectId, '12c0ffee-dada-beef-cafe-baadc0de5678');
  assert.equal(callbackConfiguration.hmacSecret, 'strongPa$$PhraseWith36CharactersMax');
});

Then('the response contains an error', () => {
  const notFound = JSON.parse(error.data) as Numbers.NotFound;
  const notFoundError = notFound.error!;
  assert.equal(notFoundError.code, 404);
  assert.equal(notFoundError.status, 'NOT_FOUND');
});
