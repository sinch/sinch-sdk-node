import { ConversationDomainApi } from '../../../src/rest/v1/conversation-domain-api';
import { Region, UnifiedCredentials } from '@sinch/sdk-client';

describe('Conversation API', () => {
  let conversationApi: ConversationDomainApi;
  let params: UnifiedCredentials;

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
    expect(conversationApi.client?.apiClientOptions.basePath).toBe('https://us.conversation.api.sinch.com');
  });

  it('should change the URL when specifying a different region', () => {
    params.region = Region.EUROPE;
    conversationApi = new ConversationDomainApi(params, 'dummy');
    conversationApi.getSinchClient();
    expect(conversationApi.client?.apiClientOptions.basePath).toBe('https://eu.conversation.api.sinch.com');
  });

  it('should log a warning when using an unsupported region', async () => {
    params.region = Region.CANADA;
    conversationApi = new ConversationDomainApi(params, 'dummy');
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    conversationApi.getSinchClient();
    // Add a small delay to allow jest to capture the warning
    setTimeout(() => {
      expect(consoleWarnSpy).toHaveBeenCalledWith('The region \'ca\' is not supported for the Conversation API');
      consoleWarnSpy.mockRestore();
    }, 20);
  });

  it('should set a custom URL', () => {
    conversationApi = new ConversationDomainApi(params, 'dummy');
    conversationApi.setBasePath('https:/foo.com');
    expect(conversationApi.client).toBeDefined();
    expect(conversationApi.client?.apiClientOptions.basePath).toBe('https:/foo.com');
  });

  it ('should update the region', () => {
    conversationApi = new ConversationDomainApi(params, 'dummy');
    conversationApi.setRegion(Region.EUROPE);
    conversationApi.getSinchClient();
    expect(conversationApi.client).toBeDefined();
    expect(conversationApi.client?.apiClientOptions.basePath).toBe('https://eu.conversation.api.sinch.com');
  });

  it ('should update the template v1 region', () => {
    conversationApi = new ConversationDomainApi(params, 'TemplatesV1Api');
    conversationApi.getSinchClient();
    expect(conversationApi.client).toBeDefined();
    expect(conversationApi.client?.apiClientOptions.basePath).toBe('https://us.template.api.sinch.com');
    conversationApi.setRegion(Region.EUROPE);
    expect(conversationApi.client?.apiClientOptions.basePath).toBe('https://eu.template.api.sinch.com');
  });

  it ('should update the template v2 region', () => {
    conversationApi = new ConversationDomainApi(params, 'TemplatesV2Api');
    conversationApi.getSinchClient();
    expect(conversationApi.client).toBeDefined();
    expect(conversationApi.client?.apiClientOptions.basePath).toBe('https://us.template.api.sinch.com');
    conversationApi.setRegion(Region.EUROPE);
    expect(conversationApi.client?.apiClientOptions.basePath).toBe('https://eu.template.api.sinch.com');
  });

});
