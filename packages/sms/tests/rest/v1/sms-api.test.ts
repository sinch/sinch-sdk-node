import { Region, ServicePlanIdCredentials, UnifiedCredentials } from '../../../src';
import { SmsDomainApi } from '../../../src/rest/v1/sms-domain-api';

describe('SMS API', () => {
  let smsApi: SmsDomainApi;
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
    smsApi = new SmsDomainApi(paramsWithProjectId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client).toBeDefined();
    expect(smsApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsApi.client?.apiClientOptions.basePath).toBe('https://zt.us.sms.api.sinch.com');
  });

  it('should initialize the client with servicePlanId credentials and use standard URL', () => {
    smsApi = new SmsDomainApi(paramsWithServicePlanId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client).toBeDefined();
    expect(smsApi.client?.apiClientOptions.projectId).toBe('SERVICE_PLAN_ID');
    expect(smsApi.client?.apiClientOptions.basePath).toBe('https://us.sms.api.sinch.com');
  });

  it('should change the URL when specifying a different region', () => {
    paramsWithServicePlanId.region = Region.CANADA;
    smsApi = new SmsDomainApi(paramsWithServicePlanId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client?.apiClientOptions.basePath).toBe('https://ca.sms.api.sinch.com');
  });

  it('should update the base path', () => {
    const newPath = 'https://new.base.path';
    smsApi = new SmsDomainApi(paramsWithServicePlanId, 'dummy');
    smsApi.setBasePath(newPath);
    expect(smsApi.client?.apiClientOptions.basePath).toBe(newPath);
  });

  it('should not update the credentials when adding servicePlanId credentials on default region', () => {
    smsApi = new SmsDomainApi(paramsWithProjectId, 'dummy');
    smsApi.getSinchClient();
    expect(smsApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsApi.client?.apiClientOptions.basePath).toBe('https://zt.us.sms.api.sinch.com');
    smsApi.setCredentials(paramsWithServicePlanId);
    expect(smsApi.client?.apiClientOptions.projectId).toBe('PROJECT_ID');
    expect(smsApi.client?.apiClientOptions.basePath).toBe('https://zt.us.sms.api.sinch.com');
  });

  it('should update the credentials and URL when forcing servicePlanId credentials', () => {
    smsApi = new SmsDomainApi(paramsWithProjectId, 'dummy');
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
    smsApi = new SmsDomainApi(paramsWithProjectId, 'dummy');
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
