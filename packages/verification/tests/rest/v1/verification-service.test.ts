import { ApiTokenRequest, SinchClientParameters } from '@sinch/sdk-client';
import { VerificationsApi, VerificationService, VerificationStatusApi } from '../../../src';
import { RequestPlugin } from '@sinch/sdk-client/src/plugins/core/request-plugin';

describe('Verification Service', () => {
  const DEFAULT_HOSTNAME = 'https://verification.api.sinch.com';
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  let errorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize all the APIs', () => {
    // Given
    const params: SinchClientParameters = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };

    // When
    const verificationService = new VerificationService(params);

    // Then
    expect(verificationService.verifications).toBeInstanceOf(VerificationsApi);
    expect(verificationService.verificationStatus).toBeInstanceOf(VerificationStatusApi);
    expect(verificationService.verifications.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(verificationService.verificationStatus.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
  });

  it('should update the API client for all the subdomains', () => {
    // Given
    const params: SinchClientParameters = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };
    const verificationService = new VerificationService(params);
    const newApiClientConfig = {
      applicationKey: 'NEW_APPLICATION_KEY',
      applicationSecret: 'NEW_APPLICATION_SECRET',
    };

    // When
    verificationService.setApiClientConfig(newApiClientConfig);

    // Then
    expect(verificationService.verifications.lazyClient.sharedConfig.applicationKey).toBe('NEW_APPLICATION_KEY');
    expect(verificationService.verificationStatus.lazyClient.sharedConfig.applicationKey).toBe('NEW_APPLICATION_KEY');
  });

  it('should override the plugins list for all the subdomains', () => {
    // Given
    const params: SinchClientParameters = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };
    const verificationService = new VerificationService(params);
    const newRequestPlugin = new ApiTokenRequest('test-token');

    // When
    const apiFetchClient = (verificationService as any).lazyClient.getApiClient();
    apiFetchClient.apiClientOptions.requestPlugins = [newRequestPlugin];

    // Then
    const assertPluginOverrideIsCorrect = (plugins: RequestPlugin[] | undefined ) => {
      expect(plugins).toBeDefined();
      expect(plugins?.length).toBe(1);
      expect(plugins?.[0]).toBeInstanceOf(ApiTokenRequest);
    };
    assertPluginOverrideIsCorrect(
      verificationService.verifications.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      verificationService.verificationStatus.lazyClient.getApiClient().apiClientOptions.requestPlugins);
  });

  it('should set a custom hostname for all APIs', () => {
    // Given
    const params: SinchClientParameters = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };

    // When
    const verificationService = new VerificationService(params);
    verificationService.setHostname(CUSTOM_HOSTNAME);

    // Then
    expect(verificationService.verifications.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(verificationService.verificationStatus.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should set new credentials for all APIs', () => {
    // Given
    const params: SinchClientParameters = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };

    // When
    const verificationService = new VerificationService(params);
    verificationService.setCredentials({
      applicationKey: 'NEW_APPLICATION_KEY',
    });

    // Then
    expect((verificationService as any).lazyClient.sharedConfig.applicationKey).toBe('NEW_APPLICATION_KEY');
    expect((verificationService as any).lazyClient.sharedConfig.applicationKey).toBe('NEW_APPLICATION_KEY');
  });

  it('should raise an exception if the credentials are invalid', () => {
    // Given
    const params: SinchClientParameters = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };

    // When
    const verificationService = new VerificationService(params);
    expect(() => verificationService.setCredentials({ applicationKey: '' }))
      .toThrow('Invalid configuration for the Verification API: "applicationKey" and "applicationSecret"'
        + ' values must be provided');
    expect(errorSpy).toHaveBeenCalledWith('Impossible to assign the new credentials to the Verification API');

    // Then
    expect((verificationService as any).lazyClient.sharedConfig.applicationKey).toBe('APPLICATION_KEY');
    expect((verificationService as any).lazyClient.sharedConfig.applicationKey).toBe('APPLICATION_KEY');
  });
});
