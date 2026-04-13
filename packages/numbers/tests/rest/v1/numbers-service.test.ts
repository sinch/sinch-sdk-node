import { RequestPlugin } from '@sinch/sdk-client/src/plugins/core/request-plugin';
import { ApiFetchClient, ApiTokenRequest, SinchClientParameters } from '@sinch/sdk-client';
import {
  ActiveNumberApi,
  AvailableNumberApi,
  AvailableRegionsApi,
  CallbacksApi,
  NumbersService,
} from '../../../src';

jest.mock('node-fetch', () => {
  const actual = jest.requireActual('node-fetch');
  return {
    __esModule: true,
    default: jest.fn(),
    Headers: actual.Headers,
    Response: actual.Response,
  };
});
import fetch, { Response } from 'node-fetch';

const mockedFetch = fetch as unknown as jest.Mock;

describe('Numbers Service', () => {
  const DEFAULT_HOSTNAME = 'https://numbers.api.sinch.com';
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
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const numbersService = new NumbersService(params);

    // Then
    expect(numbersService.availableRegions).toBeInstanceOf(AvailableRegionsApi);
    expect(numbersService.availableNumber).toBeInstanceOf(AvailableNumberApi);
    expect(numbersService.activeNumber).toBeInstanceOf(ActiveNumberApi);
    expect(numbersService.callbacks).toBeInstanceOf(CallbacksApi);
    expect(numbersService.availableRegions.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(numbersService.availableNumber.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(numbersService.activeNumber.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(numbersService.callbacks.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
  });

  it('should update the API client for all the subdomains', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const numbersService = new NumbersService(params);
    const newApiClientConfig = {
      projectId: 'NEW_PROJECT_ID',
      keyId: 'NEW_KEY_ID',
      keySecret: 'NEW_KEY_SECRET',
    };

    // When
    numbersService.setApiClientConfig(newApiClientConfig);

    // Then
    expect(numbersService.availableRegions.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(numbersService.callbacks.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(numbersService.availableNumber.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(numbersService.activeNumber.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should override the plugins list for all the subdomains', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const numbersService = new NumbersService(params);
    const newRequestPlugin = new ApiTokenRequest('test-token');

    // When
    const apiFetchClient = (numbersService as any).lazyClient.getApiClient();
    apiFetchClient.apiClientOptions.requestPlugins = [newRequestPlugin];

    // Then
    const assertPluginOverrideIsCorrect = (plugins: RequestPlugin[] | undefined ) => {
      expect(plugins).toBeDefined();
      expect(plugins?.length).toBe(1);
      expect(plugins?.[0]).toBeInstanceOf(ApiTokenRequest);
    };
    assertPluginOverrideIsCorrect(
      numbersService.availableRegions.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      numbersService.callbacks.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      numbersService.availableNumber.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      numbersService.activeNumber.lazyClient.getApiClient().apiClientOptions.requestPlugins);
  });

  it('should set a custom hostname for all APIs', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const numbersService = new NumbersService(params);
    numbersService.setHostname(CUSTOM_HOSTNAME);

    // Then
    expect(numbersService.availableRegions.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(numbersService.availableNumber.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(numbersService.activeNumber.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(numbersService.callbacks.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should set new credentials for all APIs', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const numbersService = new NumbersService(params);
    numbersService.setCredentials({
      projectId: 'NEW_PROJECT_ID',
    });

    // Then
    expect(numbersService.availableRegions.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(numbersService.availableNumber.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(numbersService.activeNumber.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(numbersService.callbacks.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should raise an exception if the credentials are invalid', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const numbersService = new NumbersService(params);
    expect(() => numbersService.setCredentials({ projectId: '' }))
      .toThrow('Invalid configuration for the Numbers API: "projectId", "keyId" and "keySecret"'
        + ' values must be provided');
    expect(errorSpy).toHaveBeenCalledWith('Impossible to assign the new credentials to the Numbers API');

    // Then
    expect(numbersService.availableRegions.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(numbersService.availableNumber.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(numbersService.activeNumber.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(numbersService.callbacks.client.apiClientOptions.projectId).toBe('PROJECT_ID');
  });

  it('should use the injected ApiFetchClient and invoke its custom plugins', async () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
    };
    const numbersService = new NumbersService(params);

    const transformSpy = jest.fn((options: any) => options);
    const dummyPlugin = {
      getName: () => 'DummyPlugin',
      load: () => ({ transform: transformSpy }),
    };

    numbersService.lazyClient.apiFetchClient = new ApiFetchClient({
      projectId: params.projectId,
      requestPlugins: [dummyPlugin],
    });

    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify({ availableRegions: [] }), { status: 200 }),
    );

    // When
    await numbersService.availableRegions.list();

    // Then
    expect(transformSpy).toHaveBeenCalled();
  });
});
