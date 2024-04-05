import { SmsDomainApi } from '../../../src/rest/v1/sms-domain-api';
import { ApiHostname, ServicePlanIdCredentials, SmsRegion, UnifiedCredentials } from '@sinch/sdk-client';

describe('SMS API', () => {
  let smsApi: SmsDomainApi;
  let paramsWithServicePlanId: ServicePlanIdCredentials & Pick<ApiHostname, 'smsHostname'>;
  let paramsWithProjectId: UnifiedCredentials & Pick<ApiHostname, 'smsHostname'>;
  const CUSTOM_HOSTNAME = 'https://new.host.name';

  beforeEach(() => {
    paramsWithServicePlanId = {
      servicePlanId: 'SERVICE_PLAN_ID',
      apiToken: 'API_TOKEN',
    };
    paramsWithProjectId = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
  });

  it('should initialize the client with unified credentials and use the "zt." URL', () => {
    smsApi = new SmsDomainApi(paramsWithProjectId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client).toBeDefined();
    expect(smsApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://zt.us.sms.api.sinch.com');
  });

  it('should initialize the client with servicePlanId credentials and use standard URL', () => {
    smsApi = new SmsDomainApi(paramsWithServicePlanId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client).toBeDefined();
    expect(smsApi.client?.apiClientOptions.projectId).toBe('SERVICE_PLAN_ID');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://us.sms.api.sinch.com');
  });

  it('should change the URL when specifying a different region', () => {
    paramsWithServicePlanId.smsRegion = SmsRegion.CANADA;
    smsApi = new SmsDomainApi(paramsWithServicePlanId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://ca.sms.api.sinch.com');
  });

  it('should log a warning when using an unsupported region', async () => {
    paramsWithProjectId.smsRegion = 'bzh';
    paramsWithProjectId.forceOAuth2ForSmsApi = true;
    smsApi = new SmsDomainApi(paramsWithProjectId, 'dummy');
    console.warn = jest.fn();
    smsApi.getSinchClient();
    expect(console.warn).toHaveBeenCalledWith(
      'The region "bzh" is not known as a supported region for the SMS API');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://zt.bzh.sms.api.sinch.com');
  });

  it('should use the hostname parameter when using projectId credentials', () => {
    paramsWithProjectId.smsHostname = CUSTOM_HOSTNAME;
    smsApi = new SmsDomainApi(paramsWithProjectId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should use the hostname parameter when using servicePlanId credentials', () => {
    paramsWithServicePlanId.smsHostname = CUSTOM_HOSTNAME;
    smsApi = new SmsDomainApi(paramsWithServicePlanId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should update the hostname', () => {
    smsApi = new SmsDomainApi(paramsWithServicePlanId, 'dummy');
    smsApi.setHostname(CUSTOM_HOSTNAME);
    expect(smsApi.client?.apiClientOptions.hostname).toBe(CUSTOM_HOSTNAME);
  });

  it('should not update the credentials when adding servicePlanId credentials on default region', () => {
    smsApi = new SmsDomainApi(paramsWithProjectId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://zt.us.sms.api.sinch.com');
    smsApi.setCredentials(paramsWithServicePlanId);
    expect(smsApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://zt.us.sms.api.sinch.com');
  });

  it('should update the credentials and URL when forcing servicePlanId credentials', () => {
    smsApi = new SmsDomainApi(paramsWithProjectId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://zt.us.sms.api.sinch.com');
    smsApi.setCredentials({
      ...paramsWithServicePlanId,
      forceServicePlanIdUsageForSmsApi: true,
    });
    expect(smsApi.client?.apiClientOptions.projectId).toBe('SERVICE_PLAN_ID');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://us.sms.api.sinch.com');
  });

  it('should update the credentials and URL when adding servicePlanId credentials on BR region', () => {
    smsApi = new SmsDomainApi(paramsWithProjectId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://zt.us.sms.api.sinch.com');
    smsApi.setCredentials({
      ...paramsWithServicePlanId,
      smsRegion: SmsRegion.BRAZIL,
    });
    expect(smsApi.client?.apiClientOptions.projectId).toBe('SERVICE_PLAN_ID');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://br.sms.api.sinch.com');
  });
});
