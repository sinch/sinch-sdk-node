import { VerificationDomainApi } from '../../../src/rest/v1/verification-domain-api';
import { ApiHostname, ApplicationCredentials, SigningRequest } from '@sinch/sdk-client';

describe('Verification API', () => {
  let verificationApi: VerificationDomainApi;
  let params: ApplicationCredentials & Pick<ApiHostname, 'verificationHostname'>;
  const CUSTOM_HOSTNAME = 'https://new.host.name';

  beforeEach(() => {
    params = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };
  });

  it('should initialize the client', () => {
    verificationApi = new VerificationDomainApi(params, 'dummy');
    verificationApi.getSinchClient();
    expect(verificationApi.client).toBeDefined();
    expect(verificationApi.client?.apiClientOptions.projectId).toBeUndefined();
    expect(verificationApi.client?.apiClientOptions.hostname).toBe('https://verification.api.sinch.com');
    expect(verificationApi.client?.apiClientOptions.requestPlugins?.length).toBe(3);
  });

  it('should use the hostname parameter', () => {
    params.verificationHostname = CUSTOM_HOSTNAME;
    verificationApi = new VerificationDomainApi(params, 'dummy');
    verificationApi.getSinchClient();
    expect(verificationApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the hostname', () => {
    verificationApi = new VerificationDomainApi(params, 'dummy');
    verificationApi.setHostname(CUSTOM_HOSTNAME);
    expect(verificationApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the credentials', () => {
    verificationApi = new VerificationDomainApi(params, 'dummy');
    verificationApi.setApplication({
      applicationKey: 'NEW_APPLICATION_KEY',
      applicationSecret: 'NEW_APPLICATION_SECRET',
    });
    const signingPlugin = verificationApi.client?.apiClientOptions.requestPlugins?.find(
      (plugin) => plugin instanceof SigningRequest,
    );
    expect(signingPlugin).toBeDefined();
    expect((signingPlugin as any).applicationId).toBe('NEW_APPLICATION_KEY');
    expect((signingPlugin as any).applicationSecret).toBe('NEW_APPLICATION_SECRET');
  });
});
