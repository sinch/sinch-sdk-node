import { NumbersDomainApi, LazyNumbersApiClient } from '../../../src';
import { ApiHostname, UnifiedCredentials } from '@sinch/sdk-client';

describe('Numbers API', () => {
  let numbersApi: NumbersDomainApi;
  let params: UnifiedCredentials & Pick<ApiHostname, 'numbersHostname'>;
  let lazyClient: LazyNumbersApiClient;
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  let errorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;

  beforeEach(() => {
    params = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    lazyClient = new LazyNumbersApiClient(params);
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize the API client', () => {
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
    });
    expect(numbersApi.client?.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should raise an exception if the credentials are invalid', () => {
    numbersApi = new NumbersDomainApi(lazyClient, 'dummy');
    expect(() => numbersApi.setCredentials({ projectId: '' }))
      .toThrow('Invalid configuration for the Numbers API: "projectId", "keyId" and "keySecret"'
        + ' values must be provided');
    expect(errorSpy).toHaveBeenCalledWith('Impossible to assign the new credentials to the Numbers API');
  });
});
