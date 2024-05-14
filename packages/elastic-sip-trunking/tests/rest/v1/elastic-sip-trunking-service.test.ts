import { SinchClientParameters } from '@sinch/sdk-client';
import {
  AccessControlListApi, CallsHistoryApi,
  CountryPermissionsApi,
  ElasticSipTrunkingService,
  SipEndpointsApi,
  SipTrunksApi,
} from '../../../src';

describe('Elastic SIP Trunking Service', () => {
  const DEFAULT_HOSTNAME = 'https://elastic-trunking.api.sinch.com';
  const CUSTOM_HOSTNAME = 'https://new.host.name';

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
    expect(elasticSipTrunkingService.sipTrunks.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(elasticSipTrunkingService.sipEndpoints.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(elasticSipTrunkingService.accessControlList.getSinchClient().apiClientOptions.hostname)
      .toBe(DEFAULT_HOSTNAME);
    expect(elasticSipTrunkingService.countryPermissions.getSinchClient().apiClientOptions.hostname)
      .toBe(DEFAULT_HOSTNAME);
    expect(elasticSipTrunkingService.calls.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
  });

  it('should set a custom hostname for all AOPIs', () => {
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
    expect(elasticSipTrunkingService.sipTrunks.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(elasticSipTrunkingService.sipEndpoints.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(elasticSipTrunkingService.accessControlList.getSinchClient().apiClientOptions.hostname)
      .toBe(CUSTOM_HOSTNAME);
    expect(elasticSipTrunkingService.countryPermissions.getSinchClient().apiClientOptions.hostname)
      .toBe(CUSTOM_HOSTNAME);
    expect(elasticSipTrunkingService.calls.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

});
