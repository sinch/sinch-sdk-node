import { RequestPlugin } from '@sinch/sdk-client/src/plugins/core/request-plugin';
import { ApiFetchClient, ApiTokenRequest, SinchClientParameters, SmsRegion } from '@sinch/sdk-client';

import {
  BatchesApi,
  DEFAULT_SMS_REGION_DEPRECATION_WARNING,
  DeliveryReportsApi,
  GroupsApi,
  InboundsApi,
  SmsService,
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

describe('SMS Service', () => {
  const DEFAULT_HOSTNAME = 'https://zt.us.sms.api.sinch.com';
  const EUROPE_HOSTNAME = 'https://zt.eu.sms.api.sinch.com';
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  let warnSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;
  let errorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
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
    const smsService = new SmsService(params);

    // Then
    expect(smsService.batches).toBeInstanceOf(BatchesApi);
    expect(smsService.deliveryReports).toBeInstanceOf(DeliveryReportsApi);
    expect(smsService.inbounds).toBeInstanceOf(InboundsApi);
    expect(smsService.groups).toBeInstanceOf(GroupsApi);
    expect(smsService.batches.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(smsService.deliveryReports.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(smsService.inbounds.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(smsService.groups.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_SMS_REGION_DEPRECATION_WARNING);
  });

  it('should update the API client for all the subdomains', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const smsService = new SmsService(params);
    const newApiClientConfig = {
      projectId: 'NEW_PROJECT_ID',
      keyId: 'NEW_KEY_ID',
      keySecret: 'NEW_KEY_SECRET',
    };

    // When
    smsService.setApiClientConfig(newApiClientConfig);

    // Then
    expect(smsService.batches.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(smsService.deliveryReports.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(smsService.groups.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(smsService.inbounds.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should override the plugins list for all the subdomains', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const smsService = new SmsService(params);
    const newRequestPlugin = new ApiTokenRequest('test-token');

    // When
    const apiFetchClient = smsService.lazyClient.getApiClient();
    apiFetchClient.apiClientOptions.requestPlugins = [newRequestPlugin];

    // Then
    const assertPluginOverrideIsCorrect = (plugins: RequestPlugin[] | undefined ) => {
      expect(plugins).toBeDefined();
      expect(plugins?.length).toBe(1);
      expect(plugins?.[0]).toBeInstanceOf(ApiTokenRequest);
    };
    assertPluginOverrideIsCorrect(
      smsService.batches.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      smsService.deliveryReports.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      smsService.groups.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      smsService.inbounds.lazyClient.getApiClient().apiClientOptions.requestPlugins);
  });

  it('should set a custom hostname for all APIs', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const smsService = new SmsService(params);

    // When
    smsService.setHostname(CUSTOM_HOSTNAME);

    // Then
    expect(smsService.batches.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(smsService.deliveryReports.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(smsService.inbounds.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(smsService.groups.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
  });

  it('should update the default region for all APIs', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const smsService = new SmsService(params);

    // When
    smsService.setRegion(SmsRegion.EUROPE);

    // Then
    expect(smsService.batches.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(smsService.deliveryReports.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(smsService.inbounds.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(smsService.groups.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
  });

  it('should set new credentials for all APIs', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const smsService = new SmsService(params);
    smsService.setCredentials({
      projectId: 'NEW_PROJECT_ID',
    });

    // Then
    expect(smsService.batches.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(smsService.deliveryReports.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(smsService.groups.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(smsService.inbounds.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should raise an exception if the credentials are invalid', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const smsService = new SmsService(params);
    expect(() => smsService.setCredentials({ projectId: '' }))
      .toThrow('Invalid parameters for the SMS API: check your configuration');
    expect(errorSpy).toHaveBeenCalledWith('Impossible to assign the new credentials to the SMS API');

    // Then
    expect(smsService.batches.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsService.deliveryReports.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsService.groups.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsService.inbounds.client.apiClientOptions.projectId).toBe('PROJECT_ID');
  });

  it('should use the injected ApiFetchClient and invoke its custom plugins', async () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
    };
    const smsService = new SmsService(params);

    const transformSpy = jest.fn((options: any) => options);
    const dummyPlugin = {
      getName: () => 'DummyPlugin',
      load: () => ({ transform: transformSpy }),
    };

    smsService.lazyClient.apiFetchClient = new ApiFetchClient({
      projectId: params.projectId,
      requestPlugins: [dummyPlugin],
    });

    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify({
        batches: [],
        count: 0,
        page: 0,
        page_size: 0,
      }), { status: 200 }),
    );

    // When
    await smsService.batches.list();

    // Then
    expect(transformSpy).toHaveBeenCalled();
  });
});
