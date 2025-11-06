import { ApiHostname, ApplicationCredentials, SigningRequest, VoiceRegion } from '@sinch/sdk-client';
import { LazyVoiceApiClient, LazyVoiceApplicationManagementApiClient, VoiceDomainApi } from '../../../src';


describe('Voice API', () => {
  let voiceApi: VoiceDomainApi;
  let voiceApplicationApi: VoiceDomainApi;
  let params: ApplicationCredentials & Pick<ApiHostname, 'voiceHostname' | 'voiceApplicationManagementHostname'>;
  let lazyVoiceClient: LazyVoiceApiClient;
  let lazyVoiceApplicationMgmtClient: LazyVoiceApplicationManagementApiClient;
  let warnSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;
  let errorSpy: jest.SpyInstance<void, [message?: any, ...optionalParams: any[]]>;
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  const CUSTOM_HOSTNAME_APPLICATIONS = 'https://apps.new.host.name';

  beforeEach(() => {
    params = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    lazyVoiceClient = new LazyVoiceApiClient(params);
    lazyVoiceApplicationMgmtClient = new LazyVoiceApplicationManagementApiClient(params);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize the client', () => {
    voiceApi = new VoiceDomainApi(lazyVoiceClient, 'dummy');
    expect(voiceApi.client).toBeDefined();
    expect(voiceApi.client?.apiClientOptions.projectId).toBeUndefined();
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling.api.sinch.com');
    expect(voiceApi.client?.apiClientOptions.requestPlugins?.length).toBe(3);
  });

  it('should change the URL when specifying a different region', () => {
    params.voiceRegion = VoiceRegion.UNITED_STATES;
    voiceApi = new VoiceDomainApi(lazyVoiceClient, 'dummy');
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling-use1.api.sinch.com');
  });

  it('should log a warning when using an unsupported region', async () => {
    params.voiceRegion = 'bzh';
    voiceApi = new VoiceDomainApi(lazyVoiceClient, 'dummy');
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling-bzh.api.sinch.com');
    expect(warnSpy).toHaveBeenCalledWith(
      'The region "bzh" is not known as a supported region for the Voice API');
  });

  it('should use the hostname parameter but not for voice application management', () => {
    params.voiceHostname = CUSTOM_HOSTNAME;
    voiceApi = new VoiceDomainApi(lazyVoiceClient, 'dummy');
    voiceApplicationApi = new VoiceDomainApi(lazyVoiceApplicationMgmtClient, 'dummy');
    expect(voiceApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(voiceApplicationApi.client?.apiClientOptions.hostname).toBe('https://callingapi.sinch.com');
  });

  it('should use the hostname parameter for voice application management only', () => {
    params.voiceApplicationManagementHostname = CUSTOM_HOSTNAME_APPLICATIONS;
    voiceApi = new VoiceDomainApi(lazyVoiceClient, 'dummy');
    voiceApplicationApi = new VoiceDomainApi(lazyVoiceApplicationMgmtClient, 'dummy');
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling.api.sinch.com');
    expect(voiceApplicationApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME_APPLICATIONS);
  });

  it('should use the hostname parameter for the 2 different domains', () => {
    params.voiceHostname = CUSTOM_HOSTNAME;
    params.voiceApplicationManagementHostname = CUSTOM_HOSTNAME_APPLICATIONS;
    voiceApi = new VoiceDomainApi(lazyVoiceClient, 'dummy');
    voiceApplicationApi = new VoiceDomainApi(lazyVoiceApplicationMgmtClient, 'dummy');
    expect(voiceApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(voiceApplicationApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME_APPLICATIONS);
  });

  it('should update the hostname', () => {
    voiceApi = new VoiceDomainApi(lazyVoiceClient, 'dummy');
    voiceApi.setHostname(CUSTOM_HOSTNAME);
    expect(voiceApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the credentials', () => {
    voiceApi = new VoiceDomainApi(lazyVoiceClient, 'dummy');
    voiceApi.setCredentials({
      applicationKey: 'NEW_APPLICATION_KEY',
      applicationSecret: 'NEW_APPLICATION_SECRET',
    });
    const signingPlugin = voiceApi.client?.apiClientOptions.requestPlugins?.find(
      (plugin) => plugin instanceof SigningRequest,
    );
    expect(signingPlugin).toBeDefined();
    expect((signingPlugin as any).applicationId).toBe('NEW_APPLICATION_KEY');
    expect((signingPlugin as any).applicationSecret).toBe('NEW_APPLICATION_SECRET');
  });

  it('should raise an exception if the credentials are invalid', () => {
    voiceApi = new VoiceDomainApi(lazyVoiceClient, 'dummy');
    expect(() => voiceApi.setCredentials({ applicationKey: '' }))
      .toThrow('Invalid configuration for the Voice API: "applicationKey" and "applicationSecret"'
        + ' values must be provided');
    expect(errorSpy).toHaveBeenCalledWith('Impossible to assign the new credentials to the Voice API');
  });

  it('should update the region', () => {
    voiceApi = new VoiceDomainApi(lazyVoiceClient, 'dummy');
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling.api.sinch.com');
    voiceApi.setRegion(VoiceRegion.UNITED_STATES);
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling-use1.api.sinch.com');
    voiceApi.setRegion(VoiceRegion.EUROPE);
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling-euc1.api.sinch.com');
    voiceApi.setRegion(VoiceRegion.SOUTH_AMERICA);
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling-sae1.api.sinch.com');
    voiceApi.setRegion(VoiceRegion.SOUTHEAST_ASIA_1);
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling-apse1.api.sinch.com');
    voiceApi.setRegion(VoiceRegion.SOUTHEAST_ASIA_2);
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling-apse2.api.sinch.com');
    voiceApi.setRegion('bzh');
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling-bzh.api.sinch.com');
    voiceApi.setRegion('');
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling.api.sinch.com');
  });

  it('should not update the region for the voice application management API', () => {
    voiceApplicationApi = new VoiceDomainApi(lazyVoiceApplicationMgmtClient, 'dummy');
    expect(voiceApplicationApi.client?.apiClientOptions.hostname).toBe('https://callingapi.sinch.com');
    voiceApplicationApi.setRegion('bzh');
    expect(voiceApplicationApi.client?.apiClientOptions.hostname).toBe('https://callingapi.sinch.com');
  });
});
