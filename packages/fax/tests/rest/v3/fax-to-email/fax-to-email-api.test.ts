import { SinchClientParameters } from '@sinch/sdk-client';
import { Fax } from '../../../../src';
import { FaxToEmailApi, FaxToEmailApiFixture } from '../../../../src';

describe('EmailsApi', () => {
  let faxToEmailApi: FaxToEmailApi;
  let fixture: FaxToEmailApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new FaxToEmailApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    faxToEmailApi = new FaxToEmailApi(credentials);
  });


  describe ('createEmailForProject', () => {
    it('should make a POST request to add an email to be used for sending and receiving faxes', async () => {
      // Given
      const requestData: Fax.AddEmailToNumbersRequestData = {
        emailRequestBody: {
          email: 'user@domain.com',
          phoneNumbers: [
            '+14155552222',
          ],
        },
      };
      const expectedResponse: Fax.Email = {
        email: 'user@domain.com',
        phoneNumbers: [
          '+14155552222',
        ],
        projectId: 'projectId',
      };

      // When
      fixture.addToNumbers.mockResolvedValue(expectedResponse);
      faxToEmailApi.addToNumbers = fixture.addToNumbers;
      const response = await faxToEmailApi.addToNumbers(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.addToNumbers).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteEmail', () => {
    it('should make a DELETE request to delete an email and its numbers association', async () => {
      // Given
      const requestData: Fax.DeleteEmailRequestData = {
        email: 'user@domain.com',
      };
      const expectedResponse = undefined;

      // When
      fixture.delete.mockResolvedValue(expectedResponse);
      faxToEmailApi.delete = fixture.delete;
      const response = await faxToEmailApi.delete(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getEmailsForProject', () => {
    it('should make a GET request to list emails for the project', async () => {
      // Given
      const requestData: Fax.ListEmailsForProjectRequestData = {
        pageSize: 2,
      };
      const mockData: Fax.Email[] = [
        {
          email: 'user@domain.com',
          phoneNumbers: [
            '+14155552222',
          ],
          projectId: 'projectId',
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
      faxToEmailApi.list = fixture.list;
      const response = await faxToEmailApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe('getEmailsForNumber', () => {
    it('should make a GET request to list the emails for a number', async () => {
      // Given
      const requestData: Fax.ListEmailsForNumberRequestData = {
        serviceId: 'serviceId',
        phoneNumber: '+15551235656',
      };
      const mockData: string[] = [
        'user@example.com',
      ];
      const expectedResponse = {
        data: mockData,
        hasNextPage: false,
        nextPageValue: '',
        nextPage: jest.fn(),
      };

      // When
      fixture.listForNumber.mockResolvedValue(expectedResponse);
      faxToEmailApi.listForNumber = fixture.listForNumber;
      const response = await faxToEmailApi.listForNumber(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.listForNumber).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getNumbersByEmail', () => {
    it('should make a GET request to list the configured numbers for an email', async () => {
      // Given
      const requestData: Fax.ListNumbersByEmailRequestData = {
        email: 'user@domain.com',
        pageSize: 2,
      };
      const mockData: Fax.ServicePhoneNumber[] = [
        {
          phoneNumber: '+14155552222',
          serviceId: 'serviceId',
          projectId: 'projectId',
        },
      ];
      const expectedResponse = {
        data: mockData,
        hasNextPage: false,
        nextPageValue: '',
        nextPage: jest.fn(),
      };

      // When
      fixture.listNumbers.mockResolvedValue(expectedResponse);
      faxToEmailApi.listNumbers = fixture.listNumbers;
      const response = await faxToEmailApi.listNumbers(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.listNumbers).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateEmail', () => {
    it('should make a PUT request to set the numbers for an email', async () => {
      // Given
      const requestData: Fax.UpdateEmailRequestData = {
        email: 'user@domain.com',
        updateEmailRequestBody: {
          phoneNumbers: [
            '+14155552222',
            '+14155553333',
          ],
        },
      };
      const expectedResponse: Fax.Email = {
        email: 'user@domain.com',
        phoneNumbers: [
          '+14155552222',
          '+14155553333',
        ],
        projectId: 'projectId',
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      faxToEmailApi.update = fixture.update;
      const response = await faxToEmailApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
