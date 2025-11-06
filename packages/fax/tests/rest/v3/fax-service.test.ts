import { ApiTokenRequest, FaxRegion, SinchClientParameters } from '@sinch/sdk-client';
import { FaxToEmailApi, FaxesApi, FaxService, ServicesApi, CoverPagesApi } from '../../../src';
import { RequestPlugin } from '@sinch/sdk-client/src/plugins/core/request-plugin';

describe('Fax Service', () => {
  const DEFAULT_HOSTNAME = 'https://fax.api.sinch.com';
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  const EUROPE_HOSTNAME = 'https://eu1.fax.api.sinch.com';
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
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const faxService = new FaxService(params);

    // Then
    expect(faxService.faxes).toBeInstanceOf(FaxesApi);
    expect(faxService.faxToEmail).toBeInstanceOf(FaxToEmailApi);
    expect(faxService.emails).toBeInstanceOf(FaxToEmailApi);
    expect(faxService.services).toBeInstanceOf(ServicesApi);
    expect(faxService.coverPages).toBeInstanceOf(CoverPagesApi);
    expect(faxService.faxes.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(faxService.faxToEmail.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(faxService.emails.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(faxService.services.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(faxService.coverPages.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
  });

  it('should update the API client for all the subdomains', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const faxService = new FaxService(params);
    const newApiClientConfig = {
      projectId: 'NEW_PROJECT_ID',
      keyId: 'NEW_KEY_ID',
      keySecret: 'NEW_KEY_SECRET',
    };

    // When
    faxService.setApiClientConfig(newApiClientConfig);

    // Then
    expect(faxService.faxes.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(faxService.faxToEmail.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(faxService.emails.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(faxService.services.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(faxService.coverPages.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should override the plugins list for all the subdomains', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const faxService = new FaxService(params);
    const newRequestPlugin = new ApiTokenRequest('test-token');

    // When
    const apiFetchClient = (faxService as any).lazyClient.getApiClient();
    apiFetchClient.apiClientOptions.requestPlugins = [newRequestPlugin];

    // Then
    const assertPluginOverrideIsCorrect = (plugins: RequestPlugin[] | undefined ) => {
      expect(plugins).toBeDefined();
      expect(plugins?.length).toBe(1);
      expect(plugins?.[0]).toBeInstanceOf(ApiTokenRequest);
    };
    assertPluginOverrideIsCorrect(
      faxService.faxes.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      faxService.faxToEmail.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      faxService.emails.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      faxService.services.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      faxService.coverPages.lazyClient.getApiClient().apiClientOptions.requestPlugins);
  });

  it('should set a custom hostname for all APIs', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const faxService = new FaxService(params);
    faxService.setHostname(CUSTOM_HOSTNAME);

    // Then
    expect(faxService.faxes.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(faxService.faxToEmail.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(faxService.emails.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(faxService.services.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(faxService.coverPages.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the default region for all APIs', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const faxService = new FaxService(params);

    // When
    faxService.setRegion(FaxRegion.EUROPE);

    // Then
    expect(faxService.faxes.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(faxService.faxToEmail.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(faxService.emails.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(faxService.services.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(faxService.coverPages.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
  });

  it('should set new credentials for all APIs', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const faxService = new FaxService(params);
    faxService.setCredentials({
      projectId: 'NEW_PROJECT_ID',
    });

    // Then
    expect(faxService.faxes.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(faxService.faxToEmail.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(faxService.emails.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(faxService.services.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(faxService.coverPages.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should raise an exception if the credentials are invalid', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const faxService = new FaxService(params);
    expect(() => faxService.setCredentials({ projectId: '' }))
      .toThrow('Invalid configuration for the Fax API: "projectId", "keyId" and "keySecret"'
        + ' values must be provided');
    expect(errorSpy).toHaveBeenCalledWith('Impossible to assign the new credentials to the Fax API');

    // Then
    expect(faxService.faxes.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(faxService.faxToEmail.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(faxService.emails.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(faxService.services.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(faxService.coverPages.client.apiClientOptions.projectId).toBe('PROJECT_ID');
  });
});
