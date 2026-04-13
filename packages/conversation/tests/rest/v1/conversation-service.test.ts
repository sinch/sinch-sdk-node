import { RequestPlugin } from '@sinch/sdk-client/src/plugins/core/request-plugin';
import { ApiFetchClient, ApiTokenRequest, ConversationRegion, SinchClientParameters } from '@sinch/sdk-client';
import {
  AppApi,
  CapabilityApi,
  ConsentsApi,
  ContactApi,
  ConversationApi,
  ConversationService,
  EventsApi,
  MessagesApi,
  TemplatesV1Api,
  TemplatesV2Api,
  TranscodingApi,
  WebhooksApi,
  DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING,
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

describe('Conversation Service', () => {
  const DEFAULT_HOSTNAME = 'https://us.conversation.api.sinch.com';
  const EUROPE_HOSTNAME = 'https://eu.conversation.api.sinch.com';
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  const DEFAULT_HOSTNAME_TEMPLATES = 'https://us.template.api.sinch.com';
  const EUROPE_HOSTNAME_TEMPLATES = 'https://eu.template.api.sinch.com';
  const CUSTOM_HOSTNAME_TEMPLATES = 'https://templates.new.host.name';
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
    const conversationService = new ConversationService(params);

    // Then
    expect(conversationService.contact).toBeInstanceOf(ContactApi);
    expect(conversationService.app).toBeInstanceOf(AppApi);
    expect(conversationService.events).toBeInstanceOf(EventsApi);
    expect(conversationService.messages).toBeInstanceOf(MessagesApi);
    expect(conversationService.transcoding).toBeInstanceOf(TranscodingApi);
    expect(conversationService.capability).toBeInstanceOf(CapabilityApi);
    expect(conversationService.conversation).toBeInstanceOf(ConversationApi);
    expect(conversationService.webhooks).toBeInstanceOf(WebhooksApi);
    expect(conversationService.templatesV1).toBeInstanceOf(TemplatesV1Api);
    expect(conversationService.templatesV2).toBeInstanceOf(TemplatesV2Api);
    expect(conversationService.consents).toBeInstanceOf(ConsentsApi);
  });

  it('should update the API client for all the subdomains', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const conversationService = new ConversationService(params);
    const newApiClientConfig = {
      projectId: 'NEW_PROJECT_ID',
      keyId: 'NEW_KEY_ID',
      keySecret: 'NEW_KEY_SECRET',
    };

    // When
    conversationService.setApiClientConfig(newApiClientConfig);

    // Then
    expect(conversationService.app.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.capability.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.consents.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.conversation.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.events.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.messages.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.projectSettings.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.templatesV1.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.templatesV2.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.transcoding.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.webhooks.lazyClient.sharedConfig.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should override the plugins list for all the subdomains', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const conversationService = new ConversationService(params);
    const newRequestPlugin = new ApiTokenRequest('test-token');

    // When
    const apiFetchClientConversation = (conversationService as any).lazyConversationClient.getApiClient();
    apiFetchClientConversation.apiClientOptions.requestPlugins = [newRequestPlugin];
    const apiFetchClientTemplates = (conversationService as any).lazyConversationTemplateClient.getApiClient();
    apiFetchClientTemplates.apiClientOptions.requestPlugins = [newRequestPlugin];

    // Then
    const assertPluginOverrideIsCorrect = (plugins: RequestPlugin[] | undefined ) => {
      expect(plugins).toBeDefined();
      expect(plugins?.length).toBe(1);
      expect(plugins?.[0]).toBeInstanceOf(ApiTokenRequest);
    };
    assertPluginOverrideIsCorrect(
      conversationService.app.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      conversationService.capability.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      conversationService.consents.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      conversationService.contact.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      conversationService.conversation.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      conversationService.events.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      conversationService.messages.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      conversationService.projectSettings.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      conversationService.templatesV1.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      conversationService.templatesV2.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      conversationService.transcoding.lazyClient.getApiClient().apiClientOptions.requestPlugins);
    assertPluginOverrideIsCorrect(
      conversationService.webhooks.lazyClient.getApiClient().apiClientOptions.requestPlugins);
  });

  it('should set a custom hostname for all APIs but templates', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const conversationService = new ConversationService(params);
    conversationService.setHostname(CUSTOM_HOSTNAME);

    // Then
    expect(conversationService.contact.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(conversationService.app.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(conversationService.events.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(conversationService.messages.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(conversationService.transcoding.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(conversationService.capability.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(conversationService.conversation.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(conversationService.webhooks.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(conversationService.consents.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.templatesV1.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME_TEMPLATES);
    expect(conversationService.templatesV2.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME_TEMPLATES);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
  });

  it('should set a custom hostnames for the templates APIs only', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const conversationService = new ConversationService(params);
    conversationService.setTemplatesHostname(CUSTOM_HOSTNAME_TEMPLATES);

    // Then
    expect(conversationService.contact.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(conversationService.app.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(conversationService.events.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(conversationService.messages.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(conversationService.transcoding.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(conversationService.capability.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(conversationService.conversation.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(conversationService.webhooks.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(conversationService.consents.client.apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
    warnSpy.mockClear();
    expect(conversationService.templatesV1.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME_TEMPLATES);
    expect(conversationService.templatesV2.client.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME_TEMPLATES);
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
    const conversationService = new ConversationService(params);
    conversationService.setCredentials({
      projectId: 'NEW_PROJECT_ID',
    });

    // Then
    expect(conversationService.contact.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.app.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.events.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.messages.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.transcoding.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.capability.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.conversation.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.webhooks.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.consents.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.projectSettings.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.templatesV1.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
    expect(conversationService.templatesV2.client.apiClientOptions.projectId).toBe('NEW_PROJECT_ID');
  });

  it('should raise an exception if the credentials are invalid', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };

    // When
    const conversationService = new ConversationService(params);
    expect(() => conversationService.setCredentials({ projectId: '' }))
      .toThrow('Invalid configuration for the Conversation API: "projectId", "keyId" and "keySecret"'
        + ' values must be provided');
    expect(errorSpy).toHaveBeenCalledWith('Impossible to assign the new credentials to the Conversation API');

    // Then
    expect(conversationService.app.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(conversationService.capability.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(conversationService.consents.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(conversationService.contact.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(conversationService.conversation.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(conversationService.events.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(conversationService.messages.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(conversationService.projectSettings.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(conversationService.transcoding.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(conversationService.webhooks.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(conversationService.templatesV1.client.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(conversationService.templatesV2.client.apiClientOptions.projectId).toBe('PROJECT_ID');
  });

  it('should update the default region for all APIs', () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const conversationService = new ConversationService(params);

    // When
    conversationService.setRegion(ConversationRegion.EUROPE);

    // Then
    expect(conversationService.contact.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(conversationService.app.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(conversationService.events.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(conversationService.messages.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(conversationService.transcoding.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(conversationService.capability.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(conversationService.conversation.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(conversationService.webhooks.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(conversationService.consents.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(conversationService.projectSettings.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(conversationService.templatesV1.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME_TEMPLATES);
    expect(conversationService.templatesV2.client.apiClientOptions.hostname).toBe(EUROPE_HOSTNAME_TEMPLATES);
  });

  it('should use the injected ApiFetchClient in the lazyConversationClient and invoke its custom plugins', async () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
    };
    const conversationService = new ConversationService(params);

    const transformSpy = jest.fn((options: any) => options);
    const dummyPlugin = {
      getName: () => 'DummyPlugin',
      load: () => ({ transform: transformSpy }),
    };

    conversationService.lazyConversationClient.apiFetchClient = new ApiFetchClient({
      projectId: params.projectId,
      requestPlugins: [dummyPlugin],
    });

    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify({ apps: [] }), { status: 200 }),
    );

    // When
    await conversationService.app.list();

    // Then
    expect(transformSpy).toHaveBeenCalled();
  });

  // eslint-disable-next-line max-len
  it('should use the injected ApiFetchClient in the lazyConversationTemplateClient and invoke its custom plugins', async () => {
    // Given
    const params: SinchClientParameters = {
      projectId: 'PROJECT_ID',
    };
    const conversationService = new ConversationService(params);

    const transformSpy = jest.fn((options: any) => options);
    const dummyPlugin = {
      getName: () => 'DummyPlugin',
      load: () => ({ transform: transformSpy }),
    };

    conversationService.lazyConversationTemplateClient.apiFetchClient = new ApiFetchClient({
      projectId: params.projectId,
      requestPlugins: [dummyPlugin],
    });

    mockedFetch.mockResolvedValue(
      new Response(JSON.stringify({ templates: [] }), { status: 200 }),
    );

    // When
    await conversationService.templatesV2.list();

    // Then
    expect(transformSpy).toHaveBeenCalled();
  });
});
