import { RequestPlugin } from '@sinch/sdk-client/src/plugins/core/request-plugin';
import { ApiFetchClient, ApiTokenRequest, SinchClientParameters, VoiceRegion } from '@sinch/sdk-client';
import { ApplicationsApi, CalloutsApi, CallsApi, ConferencesApi, VoiceService } from '../../../src';

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

describe('Voice Service', () => {
  const DEFAULT_HOSTNAME = 'https://calling.api.sinch.com';
  const EUROPE_HOSTNAME = 'https://calling-euc1.api.sinch.com';
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  const DEFAULT_HOSTNAME_APPLICATIONS = 'https://callingapi.sinch.com';
  const CUSTOM_HOSTNAME_APPLICATIONS = 'https://apps.new.host.name';
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
    const voiceService = new VoiceService(params);

    // Then
    expect(voiceService.callouts).toBeInstanceOf(CalloutsApi);
    expect(voiceService.calls).toBeInstanceOf(CallsApi);
    expect(voiceService.conferences).toBeInstanceOf(ConferencesApi);
    expect(voiceService.applications).toBeInstanceOf(ApplicationsApi);
  });

  it('should update the API client for all the subdomains', () => {
    // Given
    const params: SinchClientParameters = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };
    const voiceService = new VoiceService(params);
    const newApiClientConfig = {
      applicationKey: 'NEW_APPLICATION_KEY',
      applicationSecret: 'NEW_APPLICATION_SECRET',
    };

    // When
    voiceService.setApiClientConfig(newApiClientConfig);

    // Then
    expect(voiceService.callouts.lazyClient.sharedConfig.applicationKey).toBe('NEW_APPLICATION_KEY');
    expect(voiceService.calls.lazyClient.sharedConfig.applicationKey).toBe('NEW_APPLICATION_KEY');
    expect(voiceService.conferences.lazyClient.sharedConfig.applicationKey).toBe('NEW_APPLICATION_KEY');
    expect(voiceService.applications.lazyClient.sharedConfig.applicationKey).toBe('NEW_APPLICATION_KEY');
  });

  it('should override the plugins list for all the subdomains', () => {
    // Given
    const params: SinchClientParameters = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };
    const voiceService = new VoiceService(params);
    const newRequestPlugin = new ApiTokenRequest('test-token');

    // When
    const apiFetchClientVoice = voiceService.lazyVoiceClient.getApiClient();
    apiFetchClientVoice.apiClientOptions.requestPlugins = [newRequestPlugin];
    const apiFetchClientVoiceAppMgmt = voiceService.lazyVoiceAppMgmtClient.getApiClient();
    apiFetchClientVoiceAppMgmt.apiClientOptions.requestPlugins = [newRequestPlugin];

    // Then
    const assertPluginOverrideIsCorrect = (plugins: RequestPlugin[] | undefined ) => {
      expect(plugins).toBeDefined();
      expect(plugins?.length).toBe(1);
      expect(plugins?.[0]).toBeInstanceOf(ApiTokenRequest);
    };
    assertPluginOverrideIsCorrect(
      voiceService.callouts.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      voiceService.calls.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      voiceService.conferences.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      voiceService.applications.lazyClient.getApiClient().apiClientOptions.requestPlugins);
  });

  it('should set a custom hostname for all APIs but applications', () => {
    // Given
    const params: SinchClientParameters = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };

    // When
    const voiceService = new VoiceService(params);
    voiceService.setHostname(CUSTOM_HOSTNAME);

    // Then
    expect(voiceService.callouts.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(voiceService.calls.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(voiceService.conferences.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(voiceService.applications.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME_APPLICATIONS);
  });

  it('should set a custom hostname for the applications management API only', () => {
    // Given
    const params: SinchClientParameters = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };
    const voiceService = new VoiceService(params);

    // When
    voiceService.setApplicationsManagementHostname(CUSTOM_HOSTNAME_APPLICATIONS);

    // Then
    expect(voiceService.callouts.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(voiceService.calls.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(voiceService.conferences.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(voiceService.applications.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME_APPLICATIONS);
  });

  it('should update the default region for all APIs but for application management', () => {
    // Given
    const params: SinchClientParameters = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };
    const voiceService = new VoiceService(params);

    // When
    voiceService.setRegion(VoiceRegion.EUROPE);

    // Then
    expect(voiceService.callouts.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(voiceService.calls.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(voiceService.conferences.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(voiceService.applications.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME_APPLICATIONS);
  });

  it('should set new credentials for all APIs', () => {
    // Given
    const params: SinchClientParameters = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };

    // When
    const voiceService = new VoiceService(params);
    voiceService.setCredentials({
      applicationKey: 'NEW_APPLICATION_KEY',
    });

    // Then
    expect(voiceService.lazyVoiceClient.sharedConfig.applicationKey).toBe('NEW_APPLICATION_KEY');
    expect(voiceService.lazyVoiceAppMgmtClient.sharedConfig.applicationKey).toBe('NEW_APPLICATION_KEY');
  });

  it('should raise an exception if the credentials are invalid', () => {
    // Given
    const params: SinchClientParameters = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };

    // When
    const voiceService = new VoiceService(params);
    expect(() => voiceService.setCredentials({ applicationKey: '' }))
      .toThrow('Invalid configuration for the Voice API: "applicationKey" and "applicationSecret"'
        + ' values must be provided');
    expect(errorSpy).toHaveBeenCalledWith('Impossible to assign the new credentials to the Voice API');

    // Then
    expect(voiceService.lazyVoiceClient.sharedConfig.applicationKey).toBe('APPLICATION_KEY');
    expect(voiceService.lazyVoiceAppMgmtClient.sharedConfig.applicationKey).toBe('APPLICATION_KEY');
  });

  it('should use the injected ApiFetchClient in the lazyVoiceClient and invoke its custom plugins', async () => {
    // Given
    const voiceService = new VoiceService({});

    const transformSpy = jest.fn((options: any) => options);
    const dummyPlugin = {
      getName: () => 'DummyPlugin',
      load: () => ({ transform: transformSpy }),
    };

    voiceService.lazyVoiceClient.apiFetchClient = new ApiFetchClient({
      requestPlugins: [dummyPlugin],
    });

    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 }),
    );

    // When
    await voiceService.calls.get({
      callId: 'CALL_ID',
    });

    // Then
    expect(transformSpy).toHaveBeenCalled();
  });

  it('should use the injected ApiFetchClient in the lazyVoiceAppMgmtClient and invoke its custom plugins', async () => {
    // Given
    const voiceService = new VoiceService({});

    const transformSpy = jest.fn((options: any) => options);
    const dummyPlugin = {
      getName: () => 'DummyPlugin',
      load: () => ({ transform: transformSpy }),
    };

    voiceService.lazyVoiceAppMgmtClient.apiFetchClient = new ApiFetchClient({
      requestPlugins: [dummyPlugin],
    });

    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify({}), { status: 200 }),
    );

    // When
    await voiceService.applications.listNumbers();

    // Then
    expect(transformSpy).toHaveBeenCalled();
  });
});
