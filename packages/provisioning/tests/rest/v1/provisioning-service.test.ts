import { RequestPlugin } from '@sinch/sdk-client/src/plugins/core/request-plugin';
import { ApiTokenRequest, SinchClientParameters } from '@sinch/sdk-client';
import { ProvisioningService } from '../../../src';
import { WebhooksApi } from '../../../src/rest/v1/webhooks';

describe('Provisioning Service', () => {

  const DEFAULT_HOSTNAME = 'https://provisioning.api.sinch.com';
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  let errorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize the webhooks API', () => {
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    const provisioningService = new ProvisioningService(params);

    expect(provisioningService.webhooks).toBeInstanceOf(WebhooksApi);
    expect(provisioningService.webhooks.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
  });

  it('should update the API client config', () => {
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const provisioningService = new ProvisioningService(params);

    provisioningService.setApiClientConfig({
      projectId: 'NEW_PROJECT_ID',
      keyId: 'NEW_KEY_ID',
      keySecret: 'NEW_KEY_SECRET',
    });

    expect(provisioningService.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should override the plugins list for the webhooks subdomain', () => {
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const provisioningService = new ProvisioningService(params);
    const newRequestPlugin = new ApiTokenRequest('test-token');

    const apiFetchClient = provisioningService.lazyClient.getApiClient();
    apiFetchClient.apiClientOptions.requestPlugins = [newRequestPlugin];

    const assertPluginOverrideIsCorrect = (plugins: RequestPlugin[] | undefined ) => {
      expect(plugins).toBeDefined();
      expect(plugins?.length).toBe(1);
      expect(plugins?.[0]).toBeInstanceOf(ApiTokenRequest);
    };
    assertPluginOverrideIsCorrect(
      provisioningService.webhooks.lazyClient.getApiClient().apiClientOptions.requestPlugins);
  });

  it('should set a custom hostname for the webhooks API', () => {
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    const provisioningService = new ProvisioningService(params);
    provisioningService.setHostname(CUSTOM_HOSTNAME);

    expect(provisioningService.webhooks.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should set new credentials for the webhooks API', () => {
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    const provisioningService = new ProvisioningService(params);
    provisioningService.setCredentials({
      projectId: 'NEW_PROJECT_ID',
    });

    expect(provisioningService.webhooks.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should raise an exception if the credentials are invalid', () => {
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    const provisioningService = new ProvisioningService(params);
    expect(() => provisioningService.setCredentials({ projectId: '' }))
      .toThrow('Invalid configuration for the Provisioning API: "projectId", "keyId" and "keySecret"'
        + ' values must be provided');
    expect(errorSpy).toHaveBeenCalledWith('Impossible to assign the new credentials to the Provisioning API');

    expect(provisioningService.webhooks.client.apiClientOptions.projectId).toBe('PROJECT_ID');
  });
});
