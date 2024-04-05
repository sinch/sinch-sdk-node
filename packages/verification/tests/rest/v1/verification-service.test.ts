import { SinchClientParameters } from '@sinch/sdk-client';
import { VerificationsApi, VerificationService, VerificationStatusApi } from '../../../src';

describe('Verification Service', () => {
  const DEFAULT_HOSTNAME = 'https://verification.api.sinch.com';
  const CUSTOM_HOSTNAME = 'https://new.host.name';

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
    expect(verificationService.verifications.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(verificationService.verificationStatus.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
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
    expect(verificationService.verifications.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(verificationService.verificationStatus.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });
});
