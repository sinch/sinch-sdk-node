import { SinchClientParameters, SmsRegion } from '@sinch/sdk-client';
import { BatchesApi, DeliveryReportsApi, GroupsApi, InboundsApi, SmsService } from '../../../src';

describe('SMS Service', () => {
  const DEFAULT_HOSTNAME = 'https://zt.us.sms.api.sinch.com';
  const EUROPE_HOSTNAME = 'https://zt.eu.sms.api.sinch.com';
  const CUSTOM_HOSTNAME = 'https://new.host.name';

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
    expect(smsService.batches.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(smsService.deliveryReports.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(smsService.inbounds.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(smsService.groups.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
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
    expect(smsService.batches.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(smsService.deliveryReports.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(smsService.inbounds.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(smsService.groups.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
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
    expect(smsService.batches.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(smsService.deliveryReports.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(smsService.inbounds.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(smsService.groups.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
  });
});
