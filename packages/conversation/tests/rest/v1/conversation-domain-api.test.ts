import {
  ConversationDomainApi,
  DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING,
} from '../../../src/rest/v1/conversation-domain-api';
import { LazyConversationApiClient, LazyConversationTemplateApiClient, TemplatesV2Api } from '../../../src';
import { ApiHostname, ConversationRegion, UnifiedCredentials } from '@sinch/sdk-client';

describe('Conversation API', () => {
  let conversationApi: ConversationDomainApi;
  let templateApi: TemplatesV2Api;
  let params: UnifiedCredentials & Pick<ApiHostname, 'conversationHostname' | 'conversationTemplatesHostname'>;
  let lazyClient: LazyConversationApiClient;
  let lazyTemplateClient: LazyConversationTemplateApiClient;
  let warnSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  const CUSTOM_HOSTNAME_TEMPLATES = 'https://templates.new.host.name';

  beforeEach(() => {
    params = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    lazyClient = new LazyConversationApiClient(params);
    lazyTemplateClient = new LazyConversationTemplateApiClient(params);
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize the client with the default "us" region and log a warning', () => {
    conversationApi = new ConversationDomainApi(lazyClient, 'dummy');
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
    expect(conversationApi.client).toBeDefined();
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://us.conversation.api.sinch.com');
  });

  it('should change the URL when specifying a different region', () => {
    params.conversationRegion = ConversationRegion.EUROPE;
    conversationApi = new ConversationDomainApi(lazyClient, 'dummy');
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://eu.conversation.api.sinch.com');
    expect(warnSpy).toHaveBeenCalledTimes(0);
  });

  it('should log a warning when using an unsupported region', async () => {
    params.conversationRegion = 'bzh';
    conversationApi = new ConversationDomainApi(lazyClient, 'dummy');
    expect(warnSpy).toHaveBeenCalledWith(
      'The region "bzh" is not known as a supported region for the Conversation API');
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://bzh.conversation.api.sinch.com');
  });

  it('should use the hostname parameter but not for templates', () => {
    params.conversationHostname = CUSTOM_HOSTNAME;
    conversationApi = new ConversationDomainApi(lazyClient, 'dummy');
    expect(warnSpy).toHaveBeenCalledTimes(0);
    warnSpy.mockClear();
    templateApi = new TemplatesV2Api(lazyTemplateClient);
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
    expect(conversationApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(templateApi.client?.apiClientOptions.hostname).toBe('https://us.template.api.sinch.com');
  });

  it('should use the hostname parameter for templates only', () => {
    params.conversationTemplatesHostname = CUSTOM_HOSTNAME_TEMPLATES;
    conversationApi = new ConversationDomainApi(lazyClient, 'dummy');
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
    warnSpy.mockClear();
    templateApi = new TemplatesV2Api(lazyTemplateClient);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://us.conversation.api.sinch.com');
    expect(templateApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME_TEMPLATES);
  });

  it('should use the hostname parameter for the 2 different domains', () => {
    params.conversationHostname = CUSTOM_HOSTNAME;
    params.conversationTemplatesHostname = CUSTOM_HOSTNAME_TEMPLATES;
    conversationApi = new ConversationDomainApi(lazyClient, 'dummy');
    expect(warnSpy).toHaveBeenCalledTimes(0);
    templateApi = new TemplatesV2Api(lazyTemplateClient);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(templateApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME_TEMPLATES);
  });

  it('should set a custom URL', () => {
    conversationApi = new ConversationDomainApi(lazyClient, 'dummy');
    conversationApi.setHostname(CUSTOM_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationApi.client).toBeDefined();
    expect(conversationApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it ('should update the region', () => {
    conversationApi = new ConversationDomainApi(lazyClient, 'dummy');
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
    expect(conversationApi.client).toBeDefined();
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://us.conversation.api.sinch.com');
    conversationApi.setRegion(ConversationRegion.UNITED_STATES);
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://us.conversation.api.sinch.com');
    conversationApi.setRegion(ConversationRegion.EUROPE);
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://eu.conversation.api.sinch.com');
    conversationApi.setRegion(ConversationRegion.BRAZIL);
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://br.conversation.api.sinch.com');
    conversationApi.setRegion('bzh');
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://bzh.conversation.api.sinch.com');
    conversationApi.setRegion('');
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://conversation.api.sinch.com');
  });

  it ('should update the template v1 region', () => {
    conversationApi = new ConversationDomainApi(lazyClient, 'TemplatesV1Api');
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
    expect(conversationApi.client).toBeDefined();
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://us.template.api.sinch.com');
    conversationApi.setRegion(ConversationRegion.EUROPE);
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://eu.template.api.sinch.com');
  });

  it ('should update the template v2 region', () => {
    conversationApi = new ConversationDomainApi(lazyClient, 'TemplatesV2Api');
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
    expect(conversationApi.client).toBeDefined();
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://us.template.api.sinch.com');
    conversationApi.setRegion(ConversationRegion.EUROPE);
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://eu.template.api.sinch.com');
  });

});
