import { VerificationDomainApi } from '../../../src/rest/v1/verification-domain-api';
import { ApplicationCredentials, SigningRequest } from '@sinch/sdk-client';

describe('Verification API', () => {
  let verificationApi: VerificationDomainApi;
  let params: ApplicationCredentials;

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
    expect(verificationApi.client?.apiClientOptions.basePath).toBe('https://verification.api.sinch.com');
    expect(verificationApi.client?.apiClientOptions.requestPlugins?.length).toBe(3);
  });

  it('should update the base path', () => {
    const newPath = 'https://new.base.path';
    verificationApi = new VerificationDomainApi(params, 'dummy');
    verificationApi.setBasePath(newPath);
    expect(verificationApi.client?.apiClientOptions.basePath).toBe('https://new.base.path');
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
