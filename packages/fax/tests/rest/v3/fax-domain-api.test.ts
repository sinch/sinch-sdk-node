import { FaxDomainApi, LazyFaxApiClient } from '../../../src';
import { ApiHostname, FaxRegion, UnifiedCredentials } from '@sinch/sdk-client';

describe('Fax API', () => {
  let faxApi: FaxDomainApi;
  let params: UnifiedCredentials & Pick<ApiHostname, 'faxHostname'>;
  let lazyClient: LazyFaxApiClient;
  let errorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;
  const CUSTOM_HOSTNAME = 'https://new.host.name';

  beforeEach(() => {
    params = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    lazyClient = new LazyFaxApiClient(params);
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should initialize the client with the default hostname', () => {
    faxApi = new FaxDomainApi(lazyClient, 'dummy');
    expect(faxApi.client).toBeDefined();
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://fax.api.sinch.com');
  });

  it('should use the hostname parameter', () => {
    params.faxHostname = CUSTOM_HOSTNAME;
    faxApi = new FaxDomainApi(lazyClient, 'dummy');
    expect(faxApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should set a custom URL', () => {
    faxApi = new FaxDomainApi(lazyClient, 'dummy');
    faxApi.setHostname(CUSTOM_HOSTNAME);
    expect(faxApi.client).toBeDefined();
    expect(faxApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it ('should NOT update the region', () => {
    faxApi = new FaxDomainApi(lazyClient, 'dummy');
    const infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    expect(faxApi.client).toBeDefined();
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://fax.api.sinch.com');
    faxApi.setRegion(FaxRegion.DEFAULT);
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://fax.api.sinch.com');
    faxApi.setRegion(FaxRegion.UNITED_STATES);
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://fax.api.sinch.com');
    expect(infoSpy).toHaveBeenCalledWith(
      'Deprecated: The regions are not used for the Fax API, the request will be perform against the global endpoint https://fax.api.sinch.com');
    faxApi.setRegion(FaxRegion.EUROPE);
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://fax.api.sinch.com');
    expect(infoSpy).toHaveBeenCalledWith(
      'Deprecated: The regions are not used for the Fax API, the request will be perform against the global endpoint https://fax.api.sinch.com');
    faxApi.setRegion('');
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://fax.api.sinch.com');
    infoSpy.mockRestore();
  });

  it('should update the credentials', () => {
    faxApi = new FaxDomainApi(lazyClient, 'dummy');
    faxApi.setCredentials({
      projectId: 'NEW_PROJECT_ID',
      keyId: 'NEW_KEY_ID',
      keySecret: 'NEW_KEY_SECRET',
    });
    expect(faxApi.client?.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should raise an exception if the credentials are invalid', () => {
    faxApi = new FaxDomainApi(lazyClient, 'dummy');
    expect(() => faxApi.setCredentials({ projectId: '' }))
      .toThrow('Invalid configuration for the Fax API: "projectId", "keyId" and "keySecret"'
        + ' values must be provided');
    expect(errorSpy).toHaveBeenCalledWith('Impossible to assign the new credentials to the Fax API');
  });

});
