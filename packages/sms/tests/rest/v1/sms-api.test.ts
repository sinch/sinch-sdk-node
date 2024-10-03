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

  it ('should update the region with OAuth2 credentials', () => {
    smsApi = new SmsDomainApi(paramsWithProjectId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client).toBeDefined();
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://zt.us.sms.api.sinch.com');
    smsApi.setRegion(SmsRegion.UNITED_STATES);
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://zt.us.sms.api.sinch.com');
    smsApi.setRegion(SmsRegion.EUROPE);
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://zt.eu.sms.api.sinch.com');
    smsApi.setRegion('bzh');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://zt.bzh.sms.api.sinch.com');
    smsApi.setRegion('');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://zt.sms.api.sinch.com');
  });

  it ('should update the region with servicePlanId credentials', () => {
    smsApi = new SmsDomainApi(paramsWithServicePlanId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client).toBeDefined();
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://us.sms.api.sinch.com');
    smsApi.setRegion(SmsRegion.UNITED_STATES);
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://us.sms.api.sinch.com');
    smsApi.setRegion(SmsRegion.EUROPE);
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://eu.sms.api.sinch.com');
    smsApi.setRegion(SmsRegion.BRAZIL);
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://br.sms.api.sinch.com');
    smsApi.setRegion(SmsRegion.AUSTRALIA);
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://au.sms.api.sinch.com');
    smsApi.setRegion(SmsRegion.CANADA);
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://ca.sms.api.sinch.com');
    smsApi.setRegion('bzh');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://bzh.sms.api.sinch.com');
    smsApi.setRegion('');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://sms.api.sinch.com');
  });

  it('should update the credentials and URL when adding SMS credentials to the unified credentials', () => {
    smsApi = new SmsDomainApi(paramsWithProjectId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://zt.us.sms.api.sinch.com');
    smsApi.setCredentials({
      ...paramsWithServicePlanId,
    });
    expect(smsApi.client?.apiClientOptions.projectId).toBe('SERVICE_PLAN_ID');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://us.sms.api.sinch.com');
  });

  // eslint-disable-next-line max-len
  it('should update the credentials and URL when adding SMS credentials on BR region to the unified credentials', () => {
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

  // eslint-disable-next-line max-len
  it('should not update the credentials nor URL when adding unified credentials to the SMS credentials', () => {
    smsApi = new SmsDomainApi(paramsWithServicePlanId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client?.apiClientOptions.projectId).toBe('SERVICE_PLAN_ID');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://us.sms.api.sinch.com');
    smsApi.setCredentials({
      ...paramsWithProjectId,
    });
    expect(smsApi.client?.apiClientOptions.projectId).toBe('SERVICE_PLAN_ID');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://us.sms.api.sinch.com');
  });

  // eslint-disable-next-line max-len
  it('should update the region in the URL when adding unified credentials and region to the SMS credentials', () => {
    smsApi = new SmsDomainApi(paramsWithServicePlanId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client?.apiClientOptions.projectId).toBe('SERVICE_PLAN_ID');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://us.sms.api.sinch.com');
    console.warn = jest.fn();
    smsApi.setCredentials({
      ...paramsWithProjectId,
      smsRegion: SmsRegion.BRAZIL,
    });
    expect(console.warn).toHaveBeenCalledWith(
      'As the servicePlanId and the apiToken are provided, all other credentials will be disregarded.');
    expect(smsApi.client?.apiClientOptions.projectId).toBe('SERVICE_PLAN_ID');
    expect(smsApi.client?.apiClientOptions.hostname).toBe('https://br.sms.api.sinch.com');
  });
});
