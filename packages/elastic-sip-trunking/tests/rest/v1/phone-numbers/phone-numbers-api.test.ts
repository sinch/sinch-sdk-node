import { SinchClientParameters } from '@sinch/sdk-client';
import { PhoneNumbersApi, PhoneNumbersApiFixture, ElasticSipTrunking } from '../../../../src';
import { PhoneNumber } from '../../../../src/models';

describe('PhoneNumbersApi', () => {
  let phoneNumbersApi: PhoneNumbersApi;
  let fixture: PhoneNumbersApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new PhoneNumbersApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    phoneNumbersApi = new PhoneNumbersApi(credentials);
  });


  describe ('getPhoneNumberByNumber', () => {
    // eslint-disable-next-line max-len
    it('should make a GET request to search for an Elastic SIP Trunk-enabled phone number by the e.164 number', async () => {
      // Given
      const requestData: ElasticSipTrunking.GetPhoneNumberRequestData = {
        phoneNumber: '+15551239898',
      };
      const expectedResponse: ElasticSipTrunking.PhoneNumber = {
        id: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
        sipTrunkId: '5RTRZ3NDEKTSV4RRFFQ69G5EWS',
        phoneNumber: '+15551239898',
        countryCode: 'US',
        createTime: new Date('2022-01-01T00:00:00Z'),
        updateTime: new Date('2022-01-01T00:00:00Z'),
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      phoneNumbersApi.get = fixture.get;
      const response = await phoneNumbersApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getPhoneNumbers', () => {
    it('should make a GET request to fetch all phone numbers', async () => {
      // Given
      const requestData: ElasticSipTrunking.ListPhoneNumbersRequestData = {
        // TODO: fill the request data parameters
      };
      const mockData: PhoneNumber[] = [
        {
          id: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
          sipTrunkId: '5RTRZ3NDEKTSV4RRFFQ69G5EWS',
          phoneNumber: '+15551239898',
          countryCode: 'US',
          createTime: new Date('2022-01-01T00:00:00Z'),
          updateTime: new Date('2022-01-01T00:00:00Z'),
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
      phoneNumbersApi.list = fixture.list;
      const response = await phoneNumbersApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });
});
