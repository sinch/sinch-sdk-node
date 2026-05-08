import { ApiFetchClient, SinchClientParameters } from '@sinch/sdk-client';
import {
  AccessControlListApi, CallsHistoryApi,
  CountryPermissionsApi,
  ElasticSipTrunkingService,
  SipEndpointsApi,
  SipTrunksApi,
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

describe('Elastic SIP Trunking Service', () => {
  const DEFAULT_HOSTNAME = 'https://elastic-trunking.api.sinch.com';
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  let errorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize the APIs', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const elasticSipTrunkingService = new ElasticSipTrunkingService(params);

    // Then
    expect(elasticSipTrunkingService.sipTrunks).toBeInstanceOf(SipTrunksApi);
    expect(elasticSipTrunkingService.sipEndpoints).toBeInstanceOf(SipEndpointsApi);
    expect(elasticSipTrunkingService.accessControlList).toBeInstanceOf(AccessControlListApi);
    expect(elasticSipTrunkingService.countryPermissions).toBeInstanceOf(CountryPermissionsApi);
    expect(elasticSipTrunkingService.calls).toBeInstanceOf(CallsHistoryApi);
    expect(elasticSipTrunkingService.sipTrunks.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(elasticSipTrunkingService.sipEndpoints.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(elasticSipTrunkingService.accessControlList.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(elasticSipTrunkingService.countryPermissions.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(elasticSipTrunkingService.calls.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
  });

  it('should set a custom hostname for all APIs', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const elasticSipTrunkingService = new ElasticSipTrunkingService(params);

    // When
    elasticSipTrunkingService.setHostname(CUSTOM_HOSTNAME);

    // Then
    expect(elasticSipTrunkingService.sipTrunks.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(elasticSipTrunkingService.sipEndpoints.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(elasticSipTrunkingService.accessControlList.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(elasticSipTrunkingService.countryPermissions.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(elasticSipTrunkingService.calls.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should set new credentials for all APIs', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const elasticSipTrunkingService = new ElasticSipTrunkingService(params);
    elasticSipTrunkingService.setCredentials({
      projectId: 'NEW_PROJECT_ID',
    });

    // Then
    expect(elasticSipTrunkingService.sipTrunks.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(elasticSipTrunkingService.sipEndpoints.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(elasticSipTrunkingService.accessControlList.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(elasticSipTrunkingService.countryPermissions.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(elasticSipTrunkingService.calls.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should raise an exception if the credentials are invalid', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const elasticSipTrunkingService = new ElasticSipTrunkingService(params);
    expect(() => elasticSipTrunkingService.setCredentials({ projectId: '' }))
      .toThrow('Invalid configuration for the Elastic SIP Trunking API: "projectId", "keyId" and "keySecret"'
        + ' values must be provided');
    expect(errorSpy).toHaveBeenCalledWith('Impossible to assign the new credentials to the Elastic SIP Trunking API');

    // Then
    expect(elasticSipTrunkingService.sipTrunks.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(elasticSipTrunkingService.sipEndpoints.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(elasticSipTrunkingService.accessControlList.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(elasticSipTrunkingService.countryPermissions.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(elasticSipTrunkingService.calls.client.apiClientOptions.projectId).toBe('PROJECT_ID');
  });

  it('should use the injected ApiFetchClient and invoke its custom plugins', async () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
    };
    const elasticSipTrunkingService = new ElasticSipTrunkingService(params);

    const transformSpy = jest.fn((options: any) => options);
    const dummyPlugin = {
      getName: () => 'DummyPlugin',
      load: () => ({ transform: transformSpy }),
    };

    elasticSipTrunkingService.lazyClient.apiFetchClient = new ApiFetchClient({
      projectId: params.projectId,
      requestPlugins: [dummyPlugin],
    });

    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify({
        trunks: [],
        totalItems: 0,
        pageNumber: 1,
        pageSize: 2000,
      }), { status: 200 }),
    );

    // When
    await elasticSipTrunkingService.sipTrunks.list();

    // Then
    expect(transformSpy).toHaveBeenCalled();
  });

});
