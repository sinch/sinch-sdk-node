import { ApiHostname, ApplicationCredentials, SigningRequest } from '@sinch/sdk-client';
import { LazyVerificationApiClient, VerificationDomainApi } from '../../../src';

describe('Verification API', () => {
  let verificationApi: VerificationDomainApi;
  let params: ApplicationCredentials & Pick<ApiHostname, 'verificationHostname'>;
  let lazyClient: LazyVerificationApiClient;
  let errorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;

  const CUSTOM_HOSTNAME = 'https://new.host.name';

  beforeEach(() => {
    params = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };
    lazyClient = new LazyVerificationApiClient(params);
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should initialize the client', () => {
    verificationApi = new VerificationDomainApi(lazyClient, 'dummy');
    expect(verificationApi.client).toBeDefined();
    expect(verificationApi.client?.apiClientOptions.projectId).toBeUndefined();
    expect(verificationApi.client?.apiClientOptions.hostname).toBe('https://verification.api.sinch.com');
    expect(verificationApi.client?.apiClientOptions.requestPlugins?.length).toBe(3);
  });

  it('should use the hostname parameter', () => {
    params.verificationHostname = CUSTOM_HOSTNAME;
    verificationApi = new VerificationDomainApi(lazyClient, 'dummy');
    expect(verificationApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the hostname', () => {
    verificationApi = new VerificationDomainApi(lazyClient, 'dummy');
    verificationApi.setHostname(CUSTOM_HOSTNAME);
    expect(verificationApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the credentials', () => {
    verificationApi = new VerificationDomainApi(lazyClient, 'dummy');
    verificationApi.setCredentials({
      applicationKey: 'NEW_APPLICATION_KEY',
    });
    const signingPlugin = verificationApi.client?.apiClientOptions.requestPlugins?.find(
      (plugin) => plugin instanceof SigningRequest,
    );
    expect(signingPlugin).toBeDefined();
    expect((signingPlugin as any).applicationId).toBe('NEW_APPLICATION_KEY');
  });

  it('should raise an exception if the credentials are invalid', () => {
    verificationApi = new VerificationDomainApi(lazyClient, 'dummy');
    expect(() => verificationApi.setCredentials({ applicationKey: '' }))
      .toThrow('Invalid configuration for the Verification API: "applicationKey" and "applicationSecret"'
        + ' values must be provided');
    expect(errorSpy).toHaveBeenCalledWith('Impossible to assign the new credentials to the Verification API');
  });
});
