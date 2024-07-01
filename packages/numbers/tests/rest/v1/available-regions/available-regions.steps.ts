import { AvailableRegionsApi, NumbersService, Numbers } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';

let regionsApi: AvailableRegionsApi;
let regions: Numbers.ListAvailableRegionsResponse;

const countRegionType = (regions: Numbers.AvailableRegion[], type: Numbers.RegionNumberTypeEnum) => {
  return regions.reduce((count, region) => {
    return region.types?.includes(type) ? count + 1 : count;
  }, 0);
};

Given('the Numbers service "Regions" is available', function () {
  const numbersService = new NumbersService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    numbersHostname: 'http://localhost:3013',
  });
  regionsApi = numbersService.availableRegions;
});

When('I send a request to list all the regions', async () => {
  regions = await regionsApi.list({});
});

When('I send a request to list the TOLL_FREE regions', async () => {
  regions = await regionsApi.list({ types: ['TOLL_FREE'] });
});

When('I send a request to list the TOLL_FREE or MOBILE regions', async () => {
  regions = await regionsApi.list({ types: ['TOLL_FREE', 'MOBILE'] });
});

Then('the response contains {string} regions', (expectedAnswer: string) => {
  const expectedRegionsNumber = parseInt(expectedAnswer, 10);
  assert.equal(regions.availableRegions?.length, expectedRegionsNumber);
});

Then('the response contains {string} TOLL_FREE regions', (expectedAnswer: string) => {
  const expectedRegionsNumber = parseInt(expectedAnswer, 10);
  assert.equal(countRegionType(regions.availableRegions!, 'TOLL_FREE'), expectedRegionsNumber);
});

Then('the response contains {string} MOBILE regions', (expectedAnswer: string) => {
  const expectedRegionsNumber = parseInt(expectedAnswer, 10);
  assert.equal(countRegionType(regions.availableRegions!, 'MOBILE'), expectedRegionsNumber);
});

Then('the response contains {string} LOCAL regions', (expectedAnswer: string) => {
  const expectedRegionsNumber = parseInt(expectedAnswer, 10);
  assert.equal(countRegionType(regions.availableRegions!, 'LOCAL'), expectedRegionsNumber);
});
