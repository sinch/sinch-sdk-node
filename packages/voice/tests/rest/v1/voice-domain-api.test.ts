import { VoiceDomainApi } from '../../../src/rest/v1/voice-domain-api';
import { ApplicationsApi } from '../../../src';
import { ApiHostname, ApplicationCredentials, SigningRequest, VoiceRegion } from '@sinch/sdk-client';

describe('Voice API', () => {
  let voiceApi: VoiceDomainApi;
  let voiceApplicationApi: ApplicationsApi;
  let params: ApplicationCredentials & Pick<ApiHostname, 'voiceHostname' | 'voiceApplicationManagementHostname'>;
  const CUSTOM_HOSTNAME = 'https://new.host.name';
  const CUSTOM_HOSTNAME_APPLICATIONS = 'https://apps.new.host.name';

  beforeEach(() => {
    params = {
      applicationKey: 'APPLICATION_KEY',
      applicationSecret: 'APPLICATION_SECRET',
    };
  });

  it('should initialize the client', () => {
    voiceApi = new VoiceDomainApi(params, 'dummy');
    voiceApi.getSinchClient();
    expect(voiceApi.client).toBeDefined();
    expect(voiceApi.client?.apiClientOptions.projectId).toBeUndefined();
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling.api.sinch.com');
    expect(voiceApi.client?.apiClientOptions.requestPlugins?.length).toBe(3);
  });

  it('should change the URL when specifying a different region', () => {
    params.voiceRegion = VoiceRegion.UNITED_STATES;
    voiceApi = new VoiceDomainApi(params, 'dummy');
    voiceApi.getSinchClient();
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling-use1.api.sinch.com');
  });

  it('should log a warning when using an unsupported region', async () => {
    params.voiceRegion = 'bzh';
    voiceApi = new VoiceDomainApi(params, 'dummy');
    console.warn = jest.fn();
    voiceApi.getSinchClient();
    expect(console.warn).toHaveBeenCalledWith(
      'The region "bzh" is not known as a supported region for the Voice API');
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling-bzh.api.sinch.com');
  });

  it('should use the hostname parameter but not for voice application management', () => {
    params.voiceHostname = CUSTOM_HOSTNAME;
    voiceApi = new VoiceDomainApi(params, 'dummy');
    voiceApi.getSinchClient();
    voiceApplicationApi = new ApplicationsApi(params);
    voiceApplicationApi.getSinchClient();
    expect(voiceApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(voiceApplicationApi.client?.apiClientOptions.hostname).toBe('https://callingapi.sinch.com');
  });

  it('should use the hostname parameter for voice application management only', () => {
    params.voiceApplicationManagementHostname = CUSTOM_HOSTNAME_APPLICATIONS;
    voiceApi = new VoiceDomainApi(params, 'dummy');
    voiceApi.getSinchClient();
    voiceApplicationApi = new ApplicationsApi(params);
    voiceApplicationApi.getSinchClient();
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling.api.sinch.com');
    expect(voiceApplicationApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME_APPLICATIONS);
  });

  it('should use the hostname parameter for the 2 different domains', () => {
    params.voiceHostname = CUSTOM_HOSTNAME;
    params.voiceApplicationManagementHostname = CUSTOM_HOSTNAME_APPLICATIONS;
    voiceApi = new VoiceDomainApi(params, 'dummy');
    voiceApi.getSinchClient();
    voiceApplicationApi = new ApplicationsApi(params);
    voiceApplicationApi.getSinchClient();
    expect(voiceApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
    expect(voiceApplicationApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME_APPLICATIONS);
  });

  it('should update the hostname', () => {
    voiceApi = new VoiceDomainApi(params, 'dummy');
    voiceApi.setHostname(CUSTOM_HOSTNAME);
    expect(voiceApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the credentials', () => {
    voiceApi = new VoiceDomainApi(params, 'dummy');
    voiceApi.setApplication({
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

  it('should update the region', () => {
    voiceApi = new VoiceDomainApi(params, 'dummy');
    voiceApi.setRegion(VoiceRegion.EUROPE);
    voiceApi.getSinchClient();
    expect(voiceApi.client).toBeDefined();
    expect(voiceApi.client?.apiClientOptions.hostname).toBe('https://calling-euc1.api.sinch.com');
  });
});
