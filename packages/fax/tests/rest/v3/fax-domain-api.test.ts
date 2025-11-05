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

  it('should change the URL when specifying a different region', () => {
    params.faxRegion = FaxRegion.SOUTHEAST_ASIA_1;
    faxApi = new FaxDomainApi(lazyClient, 'dummy');
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://apse1.fax.api.sinch.com');
  });

  it('should log a warning when using an unsupported region', async () => {
    params.faxRegion = 'bzh';
    faxApi = new FaxDomainApi(lazyClient, 'dummy');
    console.warn = jest.fn();
    expect(faxApi.client).toBeDefined();
    expect(console.warn).toHaveBeenCalledWith(
      'The region "bzh" is not known as a supported region for the Fax API');
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://bzh.fax.api.sinch.com');
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

  it ('should update the region', () => {
    faxApi = new FaxDomainApi(lazyClient, 'dummy');
    expect(faxApi.client).toBeDefined();
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://fax.api.sinch.com');
    faxApi.setRegion(FaxRegion.DEFAULT);
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://fax.api.sinch.com');
    faxApi.setRegion(FaxRegion.UNITED_STATES);
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://use1.fax.api.sinch.com');
    faxApi.setRegion(FaxRegion.EUROPE);
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://eu1.fax.api.sinch.com');
    faxApi.setRegion(FaxRegion.SOUTH_AMERICA);
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://sae1.fax.api.sinch.com');
    faxApi.setRegion(FaxRegion.SOUTHEAST_ASIA_1);
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://apse1.fax.api.sinch.com');
    faxApi.setRegion(FaxRegion.SOUTHEAST_ASIA_2);
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://apse2.fax.api.sinch.com');
    faxApi.setRegion('bzh');
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://bzh.fax.api.sinch.com');
    faxApi.setRegion('');
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://fax.api.sinch.com');
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
