import { SinchClientParameters } from '@sinch/sdk-client';
import { Fax } from '../../../../src';
import { EmailsApi, EmailsApiFixture } from '../../../../src';

describe('EmailsApi', () => {
  let emailsApi: EmailsApi;
  let fixture: EmailsApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new EmailsApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    emailsApi = new EmailsApi(credentials);
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
      emailsApi.addToNumbers = fixture.addToNumbers;
      const response = await emailsApi.addToNumbers(requestData);

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
      emailsApi.delete = fixture.delete;
      const response = await emailsApi.delete(requestData);

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
      emailsApi.list = fixture.list;
      const response = await emailsApi.list(requestData);

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
      emailsApi.listForNumber = fixture.listForNumber;
      const response = await emailsApi.listForNumber(requestData);

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
      emailsApi.listNumbers = fixture.listNumbers;
      const response = await emailsApi.listNumbers(requestData);

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
      emailsApi.update = fixture.update;
      const response = await emailsApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
