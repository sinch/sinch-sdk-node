import { ProvisioningDomainApi, LazyProvisioningApiClient } from '../../../src';
import { ApiHostname, UnifiedCredentials } from '@sinch/sdk-client';

describe('Provisioning API', () => {
  let provisioningApi: ProvisioningDomainApi;
  let params: UnifiedCredentials & Pick<ApiHostname, 'provisioningHostname'>;
  let lazyClient: LazyProvisioningApiClient;
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  let errorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;

  beforeEach(() => {
    params = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    lazyClient = new LazyProvisioningApiClient(params);
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize the API client', () => {
    provisioningApi = new ProvisioningDomainApi(lazyClient, 'dummy');
    expect(provisioningApi.client).toBeDefined();
    expect(provisioningApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(provisioningApi.client?.apiClientOptions.hostname).toBe('https://provisioning.api.sinch.com');
  });

  it('should use the hostname parameter', () => {
    params.provisioningHostname = CUSTOM_HOSTNAME;
    provisioningApi = new ProvisioningDomainApi(lazyClient, 'dummy');
    expect(provisioningApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the hostname', () => {
    provisioningApi = new ProvisioningDomainApi(lazyClient, 'dummy');
    provisioningApi.setHostname(CUSTOM_HOSTNAME);
    expect(provisioningApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the credentials', () => {
    provisioningApi = new ProvisioningDomainApi(lazyClient, 'dummy');
    provisioningApi.setCredentials({
      projectId: 'NEW_PROJECT_ID',
    });
    expect(provisioningApi.client?.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should raise an exception if the credentials are invalid', () => {
    provisioningApi = new ProvisioningDomainApi(lazyClient, 'dummy');
    expect(() => provisioningApi.setCredentials({ projectId: '' }))
      .toThrow('Invalid configuration for the Provisioning API: "projectId", "keyId" and "keySecret"'
        + ' values must be provided');
    expect(errorSpy).toHaveBeenCalledWith('Impossible to assign the new credentials to the Provisioning API');
  });
});
