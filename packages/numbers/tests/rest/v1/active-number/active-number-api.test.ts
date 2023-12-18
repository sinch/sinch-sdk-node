import { SinchClientParameters } from '@sinch/sdk-client';
import {
  ActiveNumber,
  ActiveNumberApi,
  ActiveNumberApiFixture,
  GetActiveNumberRequestData,
  ListActiveNumbersRequestData,
  ReleaseNumberRequestData,
  UpdateActiveNumberRequestData,
} from '../../../../src';

describe('ActiveNumberApi', () => {
  let activeNumberApi: ActiveNumberApi;
  let fixture: ActiveNumberApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new ActiveNumberApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    activeNumberApi = new ActiveNumberApi(credentials);
  });

  describe ('getActiveNumber', () => {
    it('should make a GET request to ...', async () => {
      // Given
      const requestData: GetActiveNumberRequestData = {
        phoneNumber: '+17813334444',
      };
      const expectedResponse: ActiveNumber = {
        phoneNumber: '+17813334444',
        projectId: 'projectIdFromDashboard',
        displayName: '',
        regionCode: 'US',
        type: 'LOCAL',
        capability: [
          'SMS',
          'VOICE',
        ],
        money: {
          currencyCode: 'EUR',
          amount: '1.00',
        },
        paymentIntervalMonths: 1,
        nextChargeDate: new Date('2023-12-21T17:47:51.476076Z'),
        expireAt: null,
        smsConfiguration: {
          servicePlanId: 'servicePlanIdFromDashboard',
          scheduledProvisioning: null,
          campaignId: '',
        },
        voiceConfiguration: {
          appId: '',
          scheduledVoiceProvisioning: null,
          lastUpdatedTime: null,
        },
        callbackUrl: '',
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      activeNumberApi.get = fixture.get;
      const response = await activeNumberApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listActiveNumbers', () => {
    it('should make a GET request to list all active numbers for a project', async () => {
      // Given
      const requestData: ListActiveNumbersRequestData = {
        type: 'LOCAL',
        regionCode: 'US',
      };
      const mockData: ActiveNumber[] = [
        {
          phoneNumber: '+17813334444',
          projectId: 'projectIdFromDashboard',
          displayName: '',
          regionCode: 'US',
          type: 'LOCAL',
          capability: [
            'SMS',
            'VOICE',
          ],
          money: {
            currencyCode: 'EUR',
            amount: '1.00',
          },
          paymentIntervalMonths: 1,
          nextChargeDate: new Date('2023-12-21T17:47:51.476076Z'),
          expireAt: null,
          smsConfiguration: {
            servicePlanId: 'servicePlanIdFromDashboard',
            scheduledProvisioning: null,
            campaignId: '',
          },
          voiceConfiguration: {
            appId: '',
            scheduledVoiceProvisioning: null,
            lastUpdatedTime: null,
          },
          callbackUrl: '',
        },
      ];
      const expectedResponse = {
        data: mockData,
        hasNextPage: false,
        nextPageValue: '',
        nextPage: jest.fn(),
      };

      // When
      fixture.list.mockResolvedValue(expectedResponse);
      activeNumberApi.list = fixture.list;
      const response = await activeNumberApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('releaseNumber', () => {
    it('should make a POST request to cancel the subscription for a specific phone number', async () => {
      // Given
      const requestData: ReleaseNumberRequestData = {
        phoneNumber: '+17813334444',
      };
      const expectedResponse: ActiveNumber = {
        phoneNumber: '+17813334444',
        projectId: 'projectIdFromDashboard',
        displayName: '',
        regionCode: 'US',
        type: 'LOCAL',
        capability: [
          'SMS',
          'VOICE',
        ],
        money: {
          currencyCode: 'EUR',
          amount: '1.00',
        },
        paymentIntervalMonths: 1,
        nextChargeDate: new Date('2023-12-21T17:47:51.476076Z'),
        expireAt: new Date('2023-12-21T17:47:51.476076Z'),
        smsConfiguration: {
          servicePlanId: '',
          scheduledProvisioning: null,
          campaignId: '',
        },
        voiceConfiguration: {
          appId: '',
          scheduledVoiceProvisioning: null,
          lastUpdatedTime: null,
        },
        callbackUrl: '',
      };

      // When
      fixture.release.mockResolvedValue(expectedResponse);
      activeNumberApi.release = fixture.release;
      const response = await activeNumberApi.release(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.release).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateActiveNumber', () => {
    it('should make a PATCH request to update an active phone number configuration', async () => {
      // Given
      const requestData: UpdateActiveNumberRequestData = {
        phoneNumber: '+17813334444',
        activeNumberRequestBody: {
          displayName: 'Updated display name',
          smsConfiguration: {
            servicePlanId: 'newServicePlanId',
          },
        },
      };
      const expectedResponse: ActiveNumber = {
        phoneNumber: '+17813334444',
        projectId: 'projectIdFromDashboard',
        displayName: 'Updated display name',
        regionCode: 'US',
        type: 'LOCAL',
        capability: [
          'SMS',
          'VOICE',
        ],
        money: {
          currencyCode: 'EUR',
          amount: '1.00',
        },
        paymentIntervalMonths: 1,
        nextChargeDate: new Date('2023-12-21T17:47:51.476076Z'),
        expireAt: null,
        smsConfiguration: {
          servicePlanId: 'newServicePlanId',
          scheduledProvisioning: null,
          campaignId: '',
        },
        voiceConfiguration: {
          appId: '',
          scheduledVoiceProvisioning: null,
          lastUpdatedTime: null,
        },
        callbackUrl: '',
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      activeNumberApi.update = fixture.update;
      const response = await activeNumberApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
