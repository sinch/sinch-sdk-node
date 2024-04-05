import { FaxDomainApi } from '../../../src/rest/v3/fax-domain-api';
import { ApiHostname, UnifiedCredentials } from '@sinch/sdk-client';

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

});
