import { LazyNumberLookupApiClient } from '../../../src';
import { ApiHostname, UnifiedCredentials } from '@sinch/sdk-client';
import { NumberLookupDomainApi } from '../../../src/rest/v1/number-lookup-domain-api';

describe('Number Lookup API', () => {
  let numberLookupApi: NumberLookupDomainApi;
  let params: UnifiedCredentials & Pick<ApiHostname, 'numberLookupHostname'>;
  let lazyClient: LazyNumberLookupApiClient;
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  let errorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;

  beforeEach(() => {
    params = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    lazyClient = new LazyNumberLookupApiClient(params);
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize the API client', () => {
    numberLookupApi = new NumberLookupDomainApi(lazyClient, 'dummy');
    expect(numberLookupApi.client).toBeDefined();
    expect(numberLookupApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(numberLookupApi.client?.apiClientOptions.hostname).toBe('https://lookup.api.sinch.com');
  });

  it('should use the hostname parameter', () => {
    params.numberLookupHostname = CUSTOM_HOSTNAME;
    numberLookupApi = new NumberLookupDomainApi(lazyClient, 'dummy');
    expect(numberLookupApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the basePath', () => {
    numberLookupApi = new NumberLookupDomainApi(lazyClient, 'dummy');
    numberLookupApi.setHostname(CUSTOM_HOSTNAME);
    expect(numberLookupApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the credentials', () => {
    numberLookupApi = new NumberLookupDomainApi(lazyClient, 'dummy');
    numberLookupApi.setCredentials({
      projectId: 'NEW_PROJECT_ID',
    });
    expect(numberLookupApi.client?.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should raise an exception if the credentials are invalid', () => {
    numberLookupApi = new NumberLookupDomainApi(lazyClient, 'dummy');
    expect(() => numberLookupApi.setCredentials({ projectId: '' }))
      .toThrow('Invalid configuration for the Number Lookup API: "projectId", "keyId" and "keySecret"'
        + ' values must be provided');
    expect(errorSpy).toHaveBeenCalledWith('Impossible to assign the new credentials to the Number Lookup API');
  });
});
