import { RequestPlugin } from '@sinch/sdk-client/src/plugins/core/request-plugin';
import { ApiFetchClient, ApiTokenRequest, SinchClientParameters } from '@sinch/sdk-client';
import { NumberLookupApi, NumberLookupService } from '../../../src';

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

describe('Number Lookup Service', () => {

  const DEFAULT_HOSTNAME = 'https://lookup.api.sinch.com';
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  let errorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize the lookup API', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const numberLookupService = new NumberLookupService(params);

    // Then
    expect((numberLookupService as any)._numberLookup).toBeInstanceOf(NumberLookupApi);
    expect((numberLookupService as any)._numberLookup.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
  });

  it('should update the API client for the lookup subdomain', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const numberLookupService = new NumberLookupService(params);
    const newApiClientConfig = {
      projectId: 'NEW_PROJECT_ID',
      keyId: 'NEW_KEY_ID',
      keySecret: 'NEW_KEY_SECRET',
    };

    // When
    numberLookupService.setApiClientConfig(newApiClientConfig);

    // Then
    expect((numberLookupService as any)._numberLookup.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should override the plugins list for the lookup subdomain', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const numberLookupService = new NumberLookupService(params);
    const newRequestPlugin = new ApiTokenRequest('test-token');

    // When
    const apiFetchClient = (numberLookupService as any).lazyClient.getApiClient();
    apiFetchClient.apiClientOptions.requestPlugins = [newRequestPlugin];

    // Then
    const assertPluginOverrideIsCorrect = (plugins: RequestPlugin[] | undefined ) => {
      expect(plugins).toBeDefined();
      expect(plugins?.length).toBe(1);
      expect(plugins?.[0]).toBeInstanceOf(ApiTokenRequest);
    };
    assertPluginOverrideIsCorrect(
      (numberLookupService as any)._numberLookup.lazyClient.getApiClient().apiClientOptions.requestPlugins);
  });

  it('should set a custom hostname for the lookup API', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const numberLookupService = new NumberLookupService(params);
    numberLookupService.setHostname(CUSTOM_HOSTNAME);

    // Then
    expect((numberLookupService as any)._numberLookup.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should set new credentials for the lookup API', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const numberLookupService = new NumberLookupService(params);
    numberLookupService.setCredentials({
      projectId: 'NEW_PROJECT_ID',
    });

    // Then
    expect((numberLookupService as any)._numberLookup.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should raise an exception if the credentials are invalid', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const numberLookupService = new NumberLookupService(params);
    expect(() => numberLookupService.setCredentials({ projectId: '' }))
      .toThrow('Invalid configuration for the Number Lookup API: "projectId", "keyId" and "keySecret"'
        + ' values must be provided');
    expect(errorSpy).toHaveBeenCalledWith('Impossible to assign the new credentials to the Number Lookup API');

    // Then
    expect((numberLookupService as any)._numberLookup.client.apiClientOptions.projectId).toBe('PROJECT_ID');
  });

  it('should use the injected ApiFetchClient and invoke its custom plugins', async () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
    };
    const numberLookupService = new NumberLookupService(params);

    const transformSpy = jest.fn((options: any) => options);
    const dummyPlugin = {
      getName: () => 'DummyPlugin',
      load: () => ({ transform: transformSpy }),
    };

    numberLookupService.lazyClient.apiFetchClient = new ApiFetchClient({
      projectId: params.projectId,
      requestPlugins: [dummyPlugin],
    });

    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 }),
    );

    // When
    await numberLookupService.lookup({
      numberLookupRequestBody: {
        number: '+4155551212',
      },
    });

    // Then
    expect(transformSpy).toHaveBeenCalled();
  });
});
