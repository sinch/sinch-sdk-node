import { SinchClientParameters, VoiceRegion } from '@sinch/sdk-client';
import { ApplicationsApi, CalloutsApi, CallsApi, ConferencesApi, VoiceService } from '../../../src';

describe('Voice Service', () => {
  const DEFAULT_HOSTNAME = 'https://calling.api.sinch.com';
  const EUROPE_HOSTNAME = 'https://calling-euc1.api.sinch.com';
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  const DEFAULT_HOSTNAME_APPLICATIONS = 'https://callingapi.sinch.com';
  const CUSTOM_HOSTNAME_APPLICATIONS = 'https://apps.new.host.name';

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
    expect(voiceService.callouts.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(voiceService.calls.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(voiceService.conferences.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(voiceService.applications.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME_APPLICATIONS);
  });

  it('should set a custom hostname for the applications API only', () => {
    // Given
    const params: SinchClientParameters = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };
    const voiceService = new VoiceService(params);

    // When
    voiceService.setApplicationsManagementHostname(CUSTOM_HOSTNAME_APPLICATIONS);

    // Then
    expect(voiceService.callouts.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(voiceService.calls.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(voiceService.conferences.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(voiceService.applications.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME_APPLICATIONS);
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
    expect(voiceService.callouts.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(voiceService.calls.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(voiceService.conferences.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(voiceService.applications.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME_APPLICATIONS);
  });
});
