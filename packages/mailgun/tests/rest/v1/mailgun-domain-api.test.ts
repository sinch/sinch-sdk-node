import { MailgunDomainApi } from '../../../src/rest/v1/mailgun-domain-api';
import {
  ApiHostname,
  BasicAuthenticationRequest,
  MailgunCredentials,
  MailgunRegion,
} from '@sinch/sdk-client';

describe('Mailgun API', () => {
  let mailgunApi: MailgunDomainApi;
  let params: MailgunCredentials & Pick<ApiHostname, 'mailgunHostname'>;
  const CUSTOM_HOSTNAME = 'https://new.host.name';

  beforeEach(() => {
    params = {
      mailgunApiKey: 'API_KEY',
    };
  });

  it('should initialize the client', () => {
    mailgunApi = new MailgunDomainApi(params, 'dummy');
    mailgunApi.getSinchClient();
    expect(mailgunApi.client).toBeDefined();
    expect(mailgunApi.client?.apiClientOptions.projectId).toBeUndefined();
    expect(mailgunApi.client?.apiClientOptions.hostname).toBe('https://api.mailgun.net');
    expect(mailgunApi.client?.apiClientOptions.requestPlugins?.length).toBe(2);
  });

  it('should change the URL when specifying a different region', () => {
    params.mailgunRegion = MailgunRegion.EUROPE;
    mailgunApi = new MailgunDomainApi(params, 'dummy');
    mailgunApi.getSinchClient();
    expect(mailgunApi.client?.apiClientOptions.hostname).toBe('https://api.eu.mailgun.net');
  });

  it('should log a warning when using an unsupported region', async () => {
    params.mailgunRegion = 'bzh';
    mailgunApi = new MailgunDomainApi(params, 'dummy');
    console.warn = jest.fn();
    mailgunApi.getSinchClient();
    expect(console.warn).toHaveBeenCalledWith(
      'The region "bzh" is not known as a supported region for the Mailgun API');
    expect(mailgunApi.client?.apiClientOptions.hostname).toBe('https://api.bzh.mailgun.net');
  });

  it('should use the hostname parameter', () => {
    params.mailgunHostname = CUSTOM_HOSTNAME;
    mailgunApi = new MailgunDomainApi(params, 'dummy');
    mailgunApi.getSinchClient();
    expect(mailgunApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the hostname', () => {
    mailgunApi = new MailgunDomainApi(params, 'dummy');
    mailgunApi.setHostname(CUSTOM_HOSTNAME);
    expect(mailgunApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the credentials', () => {
    mailgunApi = new MailgunDomainApi(params, 'dummy');
    mailgunApi.setCredentials({
      mailgunApiKey: 'NEW_API_KEY',
    });
    const basicAuthPlugin = mailgunApi.client?.apiClientOptions.requestPlugins?.find(
      (plugin) => plugin instanceof BasicAuthenticationRequest,
    );
    expect(basicAuthPlugin).toBeDefined();
    expect((basicAuthPlugin as any).password).toBe('NEW_API_KEY');
  });

  it('should update the region', () => {
    mailgunApi = new MailgunDomainApi(params, 'dummy');
    mailgunApi.getSinchClient();
    expect(mailgunApi.client).toBeDefined();
    expect(mailgunApi.client?.apiClientOptions.hostname).toBe('https://api.mailgun.net');
    mailgunApi.setRegion(MailgunRegion.DEFAULT);
    expect(mailgunApi.client?.apiClientOptions.hostname).toBe('https://api.mailgun.net');
    mailgunApi.setRegion(MailgunRegion.EUROPE);
    expect(mailgunApi.client?.apiClientOptions.hostname).toBe('https://api.eu.mailgun.net');
    mailgunApi.setRegion('bzh');
    expect(mailgunApi.client?.apiClientOptions.hostname).toBe('https://api.bzh.mailgun.net');
    mailgunApi.setRegion('');
    expect(mailgunApi.client?.apiClientOptions.hostname).toBe('https://api.mailgun.net');
  });
});
