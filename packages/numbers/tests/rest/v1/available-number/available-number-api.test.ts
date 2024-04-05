import { SinchClientParameters } from '@sinch/sdk-client';
import {
  ActiveNumber,
  AvailableNumber,
  AvailableNumberApi,
  AvailableNumberApiFixture,
  AvailableNumbersResponse,
  GetAvailableNumberRequestData,
  ListAvailableNumbersRequestData,
  RentAnyNumberRequestData,
  RentNumberRequestData,
} from '../../../../src';

describe('AvailableNumberApi', () => {
  let availableNumberApi: AvailableNumberApi;
  let fixture: AvailableNumberApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new AvailableNumberApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    availableNumberApi = new AvailableNumberApi(credentials);
  });

  describe ('getAvailableNumber', () => {
    it('should make a GET request to check if a phone number is available for use', async () => {
      // Given
      const requestData: GetAvailableNumberRequestData = {
        phoneNumber: '+17813334444',
      };
      const expectedResponse: AvailableNumber = {
        phoneNumber: '+17813334444',
        regionCode: 'US',
        type: 'LOCAL',
        capability: [
          'SMS',
          'VOICE',
        ],
        setupPrice: {
          currencyCode: 'EUR',
          amount: '2.00',
        },
        monthlyPrice: {
          currencyCode: 'EUR',
          amount: '1.00',
        },
        paymentIntervalMonths: 1,
        supportingDocumentationRequired: true,
      };

      // When
      fixture.checkAvailability.mockResolvedValue(expectedResponse);
      availableNumberApi.checkAvailability = fixture.checkAvailability;
      const response = await availableNumberApi.checkAvailability(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.checkAvailability).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listAvailableNumbers', () => {
    it('should make a GET request to list the phone numbers that are available for you to activate', async () => {
      // Given
      const requestData: ListAvailableNumbersRequestData = {
        regionCode: 'US',
        type: 'LOCAL',
        'numberPattern.pattern': '%2B1781333',
        'numberPattern.searchPattern': 'START',
        capabilities: ['SMS', 'VOICE'],
      };
      const expectedResponse: AvailableNumbersResponse = {
        availableNumbers: [
          {
            phoneNumber: '+17813334444',
            regionCode: 'US',
            type: 'LOCAL',
            capability: [
              'SMS',
              'VOICE',
            ],
            setupPrice: {
              currencyCode: 'EUR',
              amount: '2.00',
            },
            monthlyPrice: {
              currencyCode: 'EUR',
              amount: '1.00',
            },
            paymentIntervalMonths: 1,
            supportingDocumentationRequired: true,
          },
        ],
      };

      // When
      fixture.list.mockResolvedValue(expectedResponse);
      availableNumberApi.list = fixture.list;
      const response = await availableNumberApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('rentAnyNumber', () => {
    it('should make a POST request to rent any number that match the criteria', async () => {
      // Given
      const requestData: RentAnyNumberRequestData = {
        rentAnyNumberRequestBody: {
          regionCode: 'US',
          type: 'LOCAL',
          numberPattern: {
            pattern: '%2B1781333',
            searchPattern: 'START',
          },
          capabilities: ['SMS', 'VOICE'],
        },
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
          servicePlanId: '',
          scheduledProvisioning: {
            servicePlanId: 'a4c187cffc754d2da37f594d46f35246',
            status: 'WAITING',
            lastUpdatedTime: new Date('2023-11-21T17:47:52.950101Z'),
            campaignId: '',
            errorCodes: [],
          },
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
      fixture.rentAny.mockResolvedValue(expectedResponse);
      availableNumberApi.rentAny = fixture.rentAny;
      const response = await availableNumberApi.rentAny(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.rentAny).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('rentNumber', () => {
    it('should make a POST request to rent a number', async () => {
      // Given
      const requestData: RentNumberRequestData = {
        phoneNumber: '+17813334444',
        rentNumberRequestBody: {
          smsConfiguration: {
            servicePlanId: 'servicePlanIdFromSinchDashboard',
          },
        },
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
          servicePlanId: '',
          scheduledProvisioning: {
            servicePlanId: 'a4c187cffc754d2da37f594d46f35246',
            status: 'WAITING',
            lastUpdatedTime: new Date('2023-11-21T17:47:52.950101Z'),
            campaignId: '',
            errorCodes: [],
          },
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
      fixture.rent.mockResolvedValue(expectedResponse);
      availableNumberApi.rent = fixture.rent;
      const response = await availableNumberApi.rent(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.rent).toHaveBeenCalledWith(requestData);
    });
  });
});
