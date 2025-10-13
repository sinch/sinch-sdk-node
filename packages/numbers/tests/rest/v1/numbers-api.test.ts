import { NumbersDomainApi, LazyNumbersApiClient } from '../../../src';
import { ApiHostname, UnifiedCredentials } from '@sinch/sdk-client';

describe('Numbers API', () => {
  let numbersApi: NumbersDomainApi;
  let params: UnifiedCredentials & Pick<ApiHostname, 'numbersHostname'>;
  let lazyClient: LazyNumbersApiClient;
  const CUSTOM_HOSTNAME = 'https://new.host.name';

  beforeEach(() => {
    params = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    lazyClient = new LazyNumbersApiClient(params);
  });

  it('should initialize the client', () => {
    numbersApi = new NumbersDomainApi(lazyClient, 'dummy');
    expect(numbersApi.client).toBeDefined();
    expect(numbersApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(numbersApi.client?.apiClientOptions.hostname).toBe('https://numbers.api.sinch.com');
  });

  it('should use the hostname parameter', () => {
    params.numbersHostname = CUSTOM_HOSTNAME;
    numbersApi = new NumbersDomainApi(lazyClient, 'dummy');
    expect(numbersApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the basePath', () => {
    numbersApi = new NumbersDomainApi(lazyClient, 'dummy');
    numbersApi.setHostname(CUSTOM_HOSTNAME);
    expect(numbersApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the credentials', () => {
    numbersApi = new NumbersDomainApi(lazyClient, 'dummy');
    numbersApi.setCredentials({
      projectId: 'NEW_PROJECT_ID',
      keyId: 'NEW_KEY_ID',
      keySecret: 'NEW_KEY_SECRET',
    });
    expect(numbersApi.client?.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
  });
});
