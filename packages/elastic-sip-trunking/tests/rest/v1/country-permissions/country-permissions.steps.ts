import { CountryPermissionsApi, ElasticSipTrunkingService, ElasticSipTrunking } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';

let countryPermissionsApi: CountryPermissionsApi;
let countryPermissionsListResponse: ElasticSipTrunking.ListCountryPermissionsResponse;
let countryPermissions: ElasticSipTrunking.CountryPermission;

Given('the Elastic SIP Trunking service "Country Permissions" is available', function () {
  const elasticSipTrunkingService = new ElasticSipTrunkingService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    elasticSipTrunkingHostname: 'http://localhost:3016',
  });
  countryPermissionsApi = elasticSipTrunkingService.countryPermissions;
});

When('I send a request to list the EST countries permissions', async () => {
  countryPermissionsListResponse = await countryPermissionsApi.list({});
});

Then('the response contains the list of EST countries permissions', () => {
  assert.ok(countryPermissionsListResponse.countryPermissions);
  assert.equal(countryPermissionsListResponse.countryPermissions.length, 51);
});

When('I send a request to retrieve an EST country\'s permissions', async () => {
  countryPermissions = await countryPermissionsApi.get({
    isoCode: 'SE',
  });
});

Then('the response contains the EST country\'s permissions details', () => {
  assert.equal(countryPermissions.isoCode, 'SE');
  assert.equal(countryPermissions.name, 'Sweden');
  assert.equal(countryPermissions.continent, 'Europe');
  assert.deepEqual(countryPermissions.countryDialingCodes, ['+46']);
  assert.equal(countryPermissions.enabled, false);
});

When('I send a request to update an EST country\'s permissions', async () => {
  countryPermissions = await countryPermissionsApi.update({
    isoCode: 'SE',
    updateCountryPermissionRequestBody: {
      enabled: true,
    },
  });
});

Then('the response contains the EST country\'s permissions details with updated data', () => {
  assert.equal(countryPermissions.isoCode, 'SE');
  assert.equal(countryPermissions.name, 'Sweden');
  assert.equal(countryPermissions.continent, 'Europe');
  assert.deepEqual(countryPermissions.countryDialingCodes, ['+46']);
  assert.equal(countryPermissions.enabled, true);
});
