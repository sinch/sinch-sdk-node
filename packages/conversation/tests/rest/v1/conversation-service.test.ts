import { ConversationRegion, SinchClientParameters } from '@sinch/sdk-client';
import {
  AppApi,
  CapabilityApi,
  ContactApi,
  ConversationApi,
  ConversationService,
  EventsApi,
  MessagesApi,
  TemplatesV1Api,
  TemplatesV2Api,
  TranscodingApi,
  WebhooksApi,
} from '../../../src';
import { DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING } from '../../../src/rest/v1/conversation-domain-api';

describe('Conversation Service', () => {
  const DEFAULT_HOSTNAME = 'https://us.conversation.api.sinch.com';
  const EUROPE_HOSTNAME = 'https://eu.conversation.api.sinch.com';
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  const DEFAULT_HOSTNAME_TEMPLATES = 'https://us.template.api.sinch.com';
  const EUROPE_HOSTNAME_TEMPLATES = 'https://eu.template.api.sinch.com';
  const CUSTOM_HOSTNAME_TEMPLATES = 'https://templates.new.host.name';
  let warnSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
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
    expect(conversationService.contact.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.app.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.events.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.messages.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.transcoding.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.capability.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.conversation.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.webhooks.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.templatesV1.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME_TEMPLATES);
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
    warnSpy.mockClear();
    expect(conversationService.templatesV2.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME_TEMPLATES);
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
    expect(conversationService.contact.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
    warnSpy.mockClear();
    expect(conversationService.app.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
    warnSpy.mockClear();
    expect(conversationService.events.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
    warnSpy.mockClear();
    expect(conversationService.messages.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
    warnSpy.mockClear();
    expect(conversationService.transcoding.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
    warnSpy.mockClear();
    expect(conversationService.capability.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
    warnSpy.mockClear();
    expect(conversationService.conversation.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
    warnSpy.mockClear();
    expect(conversationService.webhooks.getSinchClient().apiClientOptions.hostname).toBe(DEFAULT_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledWith(DEFAULT_CONVERSATION_REGION_DEPRECATION_WARNING);
    warnSpy.mockClear();
    expect(conversationService.templatesV1.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME_TEMPLATES);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.templatesV2.getSinchClient().apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME_TEMPLATES);
    expect(warnSpy).toHaveBeenCalledTimes(0);
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
    expect(conversationService.contact.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.app.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.events.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.messages.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.transcoding.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.capability.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.conversation.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.webhooks.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.templatesV1.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME_TEMPLATES);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    expect(conversationService.templatesV2.getSinchClient().apiClientOptions.hostname).toBe(EUROPE_HOSTNAME_TEMPLATES);
    expect(warnSpy).toHaveBeenCalledTimes(0);
  });
});
