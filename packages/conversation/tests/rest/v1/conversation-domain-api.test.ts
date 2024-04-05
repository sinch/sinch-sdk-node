import { ConversationDomainApi } from '../../../src/rest/v1/conversation-domain-api';
import { TemplatesV2Api } from '../../../src';
import { ApiHostname, Region, UnifiedCredentials } from '@sinch/sdk-client';

describe('Conversation API', () => {
  let conversationApi: ConversationDomainApi;
  let templateApi: TemplatesV2Api;
  let params: UnifiedCredentials & Pick<ApiHostname, 'conversationHostname' | 'conversationTemplatesHostname'>;
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  const CUSTOM_HOSTNAME_TEMPLATES = 'https://templates.new.host.name';

  beforeEach(() => {
    params = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
  });

  it('should initialize the client with the default "us" region', () => {
    conversationApi = new ConversationDomainApi(params, 'dummy');
    conversationApi.getSinchClient();
    expect(conversationApi.client).toBeDefined();
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://us.conversation.api.sinch.com');
  });

  it('should change the URL when specifying a different region', () => {
    params.region = Region.EUROPE;
    conversationApi = new ConversationDomainApi(params, 'dummy');
    conversationApi.getSinchClient();
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://eu.conversation.api.sinch.com');
  });

  it('should log a warning when using an unsupported region', async () => {
    params.region = Region.CANADA;
    conversationApi = new ConversationDomainApi(params, 'dummy');
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    conversationApi.getSinchClient();
    // Add a small delay to allow jest to capture the warning
    setTimeout(() => {
      expect(consoleWarnSpy).toHaveBeenCalledWith('The region \'ca\' is not supported for the Conversation API');
      consoleWarnSpy.mockRestore();
    }, 20);
  });

  it('should use the hostname parameter but not for templates', () => {
    params.conversationHostname = CUSTOM_HOSTNAME;
    conversationApi = new ConversationDomainApi(params, 'dummy');
    conversationApi.getSinchClient();
    templateApi = new TemplatesV2Api(params);
    templateApi.getSinchClient();
    expect(conversationApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(templateApi.client?.apiClientOptions.hostname).toBe('https://us.template.api.sinch.com');
  });

  it('should use the hostname parameter for templates only', () => {
    params.conversationTemplatesHostname = CUSTOM_HOSTNAME_TEMPLATES;
    conversationApi = new ConversationDomainApi(params, 'dummy');
    conversationApi.getSinchClient();
    templateApi = new TemplatesV2Api(params);
    templateApi.getSinchClient();
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://us.conversation.api.sinch.com');
    expect(templateApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME_TEMPLATES);
  });

  it('should use the hostname parameter for the 2 different domains', () => {
    params.conversationHostname = CUSTOM_HOSTNAME;
    params.conversationTemplatesHostname = CUSTOM_HOSTNAME_TEMPLATES;
    conversationApi = new ConversationDomainApi(params, 'dummy');
    conversationApi.getSinchClient();
    templateApi = new TemplatesV2Api(params);
    templateApi.getSinchClient();
    expect(conversationApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(templateApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME_TEMPLATES);
  });

  it('should set a custom URL', () => {
    conversationApi = new ConversationDomainApi(params, 'dummy');
    conversationApi.setHostname(CUSTOM_HOSTNAME);
    expect(conversationApi.client).toBeDefined();
    expect(conversationApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it ('should update the region', () => {
    conversationApi = new ConversationDomainApi(params, 'dummy');
    conversationApi.setRegion(Region.EUROPE);
    conversationApi.getSinchClient();
    expect(conversationApi.client).toBeDefined();
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://eu.conversation.api.sinch.com');
  });

  it ('should update the template v1 region', () => {
    conversationApi = new ConversationDomainApi(params, 'TemplatesV1Api');
    conversationApi.getSinchClient();
    expect(conversationApi.client).toBeDefined();
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://us.template.api.sinch.com');
    conversationApi.setRegion(Region.EUROPE);
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://eu.template.api.sinch.com');
  });

  it ('should update the template v2 region', () => {
    conversationApi = new ConversationDomainApi(params, 'TemplatesV2Api');
    conversationApi.getSinchClient();
    expect(conversationApi.client).toBeDefined();
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://us.template.api.sinch.com');
    conversationApi.setRegion(Region.EUROPE);
    expect(conversationApi.client?.apiClientOptions.hostname).toBe('https://eu.template.api.sinch.com');
  });

});
