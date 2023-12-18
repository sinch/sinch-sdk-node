import { Region, ServicePlanIdCredentials, UnifiedCredentials } from '../../../src';
import { SmsApi } from '../../../src/rest/v1/sms-api';

describe('SMS API', () => {
  let smsApi: SmsApi;
  let paramsWithServicePlanId: ServicePlanIdCredentials;
  let paramsWithProjectId: UnifiedCredentials;

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
    smsApi = new SmsApi(paramsWithProjectId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client).toBeDefined();
    expect(smsApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsApi.client?.apiClientOptions.basePath).toBe('https://zt.us.sms.api.sinch.com');
  });

  it('should initialize the client with servicePlanId credentials and use standard URL', () => {
    smsApi = new SmsApi(paramsWithServicePlanId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client).toBeDefined();
    expect(smsApi.client?.apiClientOptions.projectId).toBe('SERVICE_PLAN_ID');
    expect(smsApi.client?.apiClientOptions.basePath).toBe('https://us.sms.api.sinch.com');
  });

  it('should change the URL when specifying a different region', () => {
    paramsWithServicePlanId.region = Region.CANADA;
    smsApi = new SmsApi(paramsWithServicePlanId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client?.apiClientOptions.basePath).toBe('https://ca.sms.api.sinch.com');
  });

  it('should update the base path', () => {
    const newPath = 'https://new.base.path';
    smsApi = new SmsApi(paramsWithServicePlanId, 'dummy');
    smsApi.setBasePath(newPath);
    expect(smsApi.client?.apiClientOptions.basePath).toBe(newPath);
  });

  it('should not update the credentials when adding servicePlanId credentials on default region', () => {
    smsApi = new SmsApi(paramsWithProjectId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsApi.client?.apiClientOptions.basePath).toBe('https://zt.us.sms.api.sinch.com');
    smsApi.setCredentials(paramsWithServicePlanId);
    expect(smsApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsApi.client?.apiClientOptions.basePath).toBe('https://zt.us.sms.api.sinch.com');
  });

  it('should update the credentials and URL when forcing servicePlanId credentials', () => {
    smsApi = new SmsApi(paramsWithProjectId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsApi.client?.apiClientOptions.basePath).toBe('https://zt.us.sms.api.sinch.com');
    smsApi.setCredentials({
      ...paramsWithServicePlanId,
      forceServicePlanIdUsageForSmsApi: true,
    });
    expect(smsApi.client?.apiClientOptions.projectId).toBe('SERVICE_PLAN_ID');
    expect(smsApi.client?.apiClientOptions.basePath).toBe('https://us.sms.api.sinch.com');
  });

  it('should update the credentials and URL when adding servicePlanId credentials on BR region', () => {
    smsApi = new SmsApi(paramsWithProjectId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsApi.client?.apiClientOptions.basePath).toBe('https://zt.us.sms.api.sinch.com');
    smsApi.setCredentials({
      ...paramsWithServicePlanId,
      region: Region.BRAZIL,
    });
    expect(smsApi.client?.apiClientOptions.projectId).toBe('SERVICE_PLAN_ID');
    expect(smsApi.client?.apiClientOptions.basePath).toBe('https://br.sms.api.sinch.com');
  });
});
