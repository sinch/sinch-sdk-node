import { ElasticSipTrunkingDomainApi } from '../../../src/rest/v1/elastic-sip-trunking-domain-api';
import { ApiHostname, UnifiedCredentials } from '@sinch/sdk-client';

describe('Elastic SIP Trunking API', () => {
  let elasticSipTrunkingApi: ElasticSipTrunkingDomainApi;
  let params: UnifiedCredentials & Pick<ApiHostname, 'elasticSipTrunkingHostname'>;
  const CUSTOM_HOSTNAME = 'https://new.host.name';

  beforeEach(() => {
    params = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
  });

  it('should initialize the client with the default hostname', () => {
    elasticSipTrunkingApi = new ElasticSipTrunkingDomainApi(params, 'dummy');
    elasticSipTrunkingApi.getSinchClient();
    expect(elasticSipTrunkingApi.client).toBeDefined();
    expect(elasticSipTrunkingApi.client?.apiClientOptions.hostname).toBe('https://elastic-trunking.api.sinch.com');
  });

  it('should use the hostname parameter', () => {
    params.elasticSipTrunkingHostname = CUSTOM_HOSTNAME;
    elasticSipTrunkingApi = new ElasticSipTrunkingDomainApi(params, 'dummy');
    elasticSipTrunkingApi.getSinchClient();
    expect(elasticSipTrunkingApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should set a custom URL', () => {
    elasticSipTrunkingApi = new ElasticSipTrunkingDomainApi(params, 'dummy');
    elasticSipTrunkingApi.setHostname(CUSTOM_HOSTNAME);
    expect(elasticSipTrunkingApi.client).toBeDefined();
    expect(elasticSipTrunkingApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });
});
