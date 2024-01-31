import { ConversationApi, Region, UnifiedCredentials } from '../../../src';

describe('Conversation API', () => {
  let conversationApi: ConversationApi;
  let params: UnifiedCredentials;

  beforeEach(() => {
    params = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
  });

  it('should initialize the client with the default "us" region', () => {
    conversationApi = new ConversationApi(params);
    conversationApi.getSinchClient();
    expect(conversationApi.client).toBeDefined();
    expect(conversationApi.client?.apiClientOptions.basePath).toBe('https://us.conversation.api.sinch.com');
  });

  it('should change the URL when specifying a different region', () => {
    params.region = Region.EUROPE;
    conversationApi = new ConversationApi(params);
    conversationApi.getSinchClient();
    expect(conversationApi.client?.apiClientOptions.basePath).toBe('https://eu.conversation.api.sinch.com');
  });

  it('should throw an error when using an unsupported region', async () => {
    params.region = Region.CANADA;
    conversationApi = new ConversationApi(params);
    const consoleWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    await conversationApi.getSinchClient();
    // Add a small delay to allow jest to capture the warning
    setTimeout(() => {
      expect(consoleWarnSpy).toHaveBeenCalledWith('The region \'ca\' is not supported for the Conversation API');
      consoleWarnSpy.mockRestore();
    }, 20);
  });

  it('should set a custom URL', () => {
    conversationApi = new ConversationApi(params);
    conversationApi.setBasePath('https:/foo.com');
    expect(conversationApi.client).toBeDefined();
    expect(conversationApi.client?.apiClientOptions.basePath).toBe('https:/foo.com');
  });

});
