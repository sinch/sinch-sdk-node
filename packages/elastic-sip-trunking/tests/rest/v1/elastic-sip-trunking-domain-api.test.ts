import { ElasticSipTrunkingDomainApi, LazyElasticSipTrunkingApiClient } from '../../../src';
import { ApiHostname, UnifiedCredentials } from '@sinch/sdk-client';

describe('Elastic SIP Trunking API', () => {
  let elasticSipTrunkingApi: ElasticSipTrunkingDomainApi;
  let params: UnifiedCredentials & Pick<ApiHostname, 'elasticSipTrunkingHostname'>;
  let lazyClient: LazyElasticSipTrunkingApiClient;
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  let errorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;

  beforeEach(() => {
    params = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    lazyClient = new LazyElasticSipTrunkingApiClient(params);
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should initialize the client with the default hostname', () => {
    elasticSipTrunkingApi = new ElasticSipTrunkingDomainApi(lazyClient, 'dummy');
    expect(elasticSipTrunkingApi.client).toBeDefined();
    expect(elasticSipTrunkingApi.client?.apiClientOptions.hostname).toBe('https://elastic-trunking.api.sinch.com');
  });

  it('should use the hostname parameter', () => {
    params.elasticSipTrunkingHostname = CUSTOM_HOSTNAME;
    elasticSipTrunkingApi = new ElasticSipTrunkingDomainApi(lazyClient, 'dummy');
    expect(elasticSipTrunkingApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should set a custom URL', () => {
    elasticSipTrunkingApi = new ElasticSipTrunkingDomainApi(lazyClient, 'dummy');
    elasticSipTrunkingApi.setHostname(CUSTOM_HOSTNAME);
    expect(elasticSipTrunkingApi.client).toBeDefined();
    expect(elasticSipTrunkingApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the credentials', () => {
    elasticSipTrunkingApi = new ElasticSipTrunkingDomainApi(lazyClient, 'dummy');
    elasticSipTrunkingApi.setCredentials({
      projectId: 'NEW_PROJECT_ID',
    });
    expect(elasticSipTrunkingApi.client?.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should raise an exception if the credentials are invalid', () => {
    elasticSipTrunkingApi = new ElasticSipTrunkingDomainApi(lazyClient, 'dummy');
    expect(() => elasticSipTrunkingApi.setCredentials({ projectId: '' }))
      .toThrow('Invalid configuration for the Elastic SIP Trunking API: "projectId", "keyId" and "keySecret"'
        + ' values must be provided');
    expect(errorSpy).toHaveBeenCalledWith('Impossible to assign the new credentials to the Elastic SIP Trunking API');
  });
});
