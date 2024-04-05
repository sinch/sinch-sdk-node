import { SinchClientParameters } from '@sinch/sdk-client';
import { EmailsApi, FaxesApi, FaxService, ServicesApi } from '../../../src';

describe('Fax Service', () => {
  const DEFAULT_HOSTNAME = 'https://fax.api.sinch.com';
  const CUSTOM_HOSTNAME = 'https://new.host.name';

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
    expect(faxService.emails).toBeInstanceOf(EmailsApi);
    expect(faxService.services).toBeInstanceOf(ServicesApi);
    expect(faxService.faxes.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(faxService.emails.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(faxService.services.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
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
    expect(faxService.faxes.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(faxService.emails.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(faxService.services.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });
});
