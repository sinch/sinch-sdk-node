import { NumbersApi } from '../../../src/rest/v1/numbers-api';
import { SinchClientParameters } from '@sinch/sdk-client';

describe('Numbers API', () => {
  let numbersApi: NumbersApi;
  let params: SinchClientParameters;

  beforeEach(() => {
    params = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
  });

  it('should initialize the client', () => {
    numbersApi = new NumbersApi(params, 'dummy');
    numbersApi.getSinchClient();
    expect(numbersApi.client).toBeDefined();
    expect(numbersApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(numbersApi.client?.apiClientOptions.basePath).toBe('https://numbers.api.sinch.com');
  });

  it('should update the basePath', () => {
    const newPath = 'https://new.base.path';
    numbersApi = new NumbersApi(params, 'dummy');
    numbersApi.setBasePath(newPath);
    expect(numbersApi.client?.apiClientOptions.basePath).toBe(newPath);
  });

  it('should update the credentials', () => {
    numbersApi = new NumbersApi(params, 'dummy');
    numbersApi.setCredentials({
      projectId: 'NEW_PROJECT_ID',
      keyId: 'NEW_KEY_ID',
      keySecret: 'NEW_KEY_SECRET',
    });
    expect(numbersApi.client?.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
  });
});
