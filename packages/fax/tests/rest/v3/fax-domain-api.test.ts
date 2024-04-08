import { FaxDomainApi } from '../../../src/rest/v3/fax-domain-api';
import { ApiHostname, FaxRegion, UnifiedCredentials } from '@sinch/sdk-client';

describe('Fax API', () => {
  let faxApi: FaxDomainApi;
  let params: UnifiedCredentials & Pick<ApiHostname, 'faxHostname'>;
  const CUSTOM_HOSTNAME = 'https://new.host.name';

  beforeEach(() => {
    params = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
  });

  it('should initialize the client with the default hostname', () => {
    faxApi = new FaxDomainApi(params, 'dummy');
    faxApi.getSinchClient();
    expect(faxApi.client).toBeDefined();
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://fax.api.sinch.com');
  });

  it('should change the URL when specifying a different region', () => {
    params.faxRegion = FaxRegion.SOUTHEAST_ASIA_1;
    faxApi = new FaxDomainApi(params, 'dummy');
    faxApi.getSinchClient();
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://apse1.fax.api.sinch.com');
  });

  it('should log a warning when using an unsupported region', async () => {
    params.faxRegion = 'bzh';
    faxApi = new FaxDomainApi(params, 'dummy');
    console.warn = jest.fn();
    faxApi.getSinchClient();
    expect(console.warn).toHaveBeenCalledWith(
      'The region "bzh" is not known as a supported region for the Fax API');
    expect(faxApi.client?.apiClientOptions.hostname).toBe('https://bzh.fax.api.sinch.com');
  });

  it('should use the hostname parameter', () => {
    params.faxHostname = CUSTOM_HOSTNAME;
    faxApi = new FaxDomainApi(params, 'dummy');
    faxApi.getSinchClient();
    expect(faxApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should set a custom URL', () => {
    faxApi = new FaxDomainApi(params, 'dummy');
    faxApi.setHostname(CUSTOM_HOSTNAME);
    expect(faxApi.client).toBeDefined();
    expect(faxApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it ('should update the region', () => {
    faxApi = new FaxDomainApi(params, 'dummy');
    faxApi.getSinchClient();
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

});
