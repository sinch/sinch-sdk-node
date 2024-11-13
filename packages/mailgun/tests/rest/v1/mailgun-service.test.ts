import { SinchClientParameters } from '@sinch/sdk-client';
import { EmailsApi, MailgunService } from '../../../src';

describe('Mailgun Service', () => {

  const CUSTOM_HOSTNAME = 'https://new.host.name';
  const CUSTOM_STORAGE_HOSTNAMES = [
    'https://new-region.storage.name',
    'https://other-region.storage.name',
  ];
  let params: SinchClientParameters;

  beforeEach(() => {
    params = {
      mailgunApiKey: 'API_KEY',
    };
  });

  it('should initialize all the APIs', () => {
    // When
    const mailgunService = new MailgunService(params);

    // Then
    expect(mailgunService.emails).toBeInstanceOf(EmailsApi);
  });

  it('should set a custom hostname', () => {
    // When
    const mailgunService = new MailgunService(params);
    mailgunService.setHostname(CUSTOM_HOSTNAME);

    // Then
    expect(mailgunService.emails.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should set custom storage hostnames', () => {
    // When
    const mailgunService = new MailgunService(params);
    mailgunService.setStorageHostnames(CUSTOM_STORAGE_HOSTNAMES);

    // Then
    expect(mailgunService.emails.storageHostnames).toBe(CUSTOM_STORAGE_HOSTNAMES);
  });
});
