import { FileBuffer, SinchClientParameters } from '@sinch/sdk-client';
import {
  Fax,
  FaxesApi,
  FaxesApiFixture,
} from '../../../../src';

describe('FaxesApi', () => {
  let faxesApi: FaxesApi;
  let fixture: FaxesApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new FaxesApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    faxesApi = new FaxesApi(credentials);
  });


  describe ('deleteFaxContentById', () => {
    it('should make a DELETE request to delete the content of a fax from storage', async () => {
      // Given
      const requestData: Fax.DeleteFaxContentRequestData = {
        id: 'fax_id',
      };
      const expectedResponse: void = undefined;

      // When
      fixture.deleteContent.mockResolvedValue(expectedResponse);
      faxesApi.deleteContent = fixture.deleteContent;
      const response = await faxesApi.deleteContent(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.deleteContent).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getFaxFileById', () => {
    it('should make a GET request to download a fax content', async () => {
      // Given
      const requestData: Fax.DownloadFaxContentRequestData = {
        id: 'fax_id',
      };
      const expectedResponse: FileBuffer = {
        fileName: 'default-name.pdf',
        buffer: Buffer.from('PDF file content goes here', 'utf-8'),
      };

      // When
      fixture.downloadContent.mockResolvedValue(expectedResponse);
      faxesApi.downloadContent = fixture.downloadContent;
      const response = await faxesApi.downloadContent(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.downloadContent).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getFaxInfoPerId', () => {
    it('should make a GET request to retrieve some fax information', async () => {
      // Given
      const requestData: Fax.GetFaxRequestData = {
        id: 'fax_id',
      };
      const expectedResponse: Fax.Fax = {
        id: 'fax_id',
        direction: 'OUTBOUND',
        to: '+12015555555',
        status: 'FAILURE',
        headerTimeZone: 'America/New_York',
        retryDelaySeconds: 60,
        callbackContentType: 'multipart/form-data',
        errorType: 'LINE_ERROR',
        errorId: 89,
        errorCode: 'The call dropped prematurely',
        projectId: 'projectId',
        serviceId: 'serviceId',
        maxRetries: 3,
        createTime: new Date('2024-02-27T12:28:09.000Z'),
        headerPageNumbers: true,
        retryCount: 3,
        contentUrl: [
          'https://developers.sinch.com/fax/fax.pdf',
        ],
        imageConversionMethod: 'HALFTONE',
        hasFile: 'true',
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      faxesApi.get = fixture.get;
      const response = await faxesApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getFaxes', () => {
    it('should make a GET request to list faxes sent or received', async () => {
      // Given
      const requestData: Fax.ListFaxesRequestData = {
        direction: 'OUTBOUND',
      };
      const mockData: Fax.Fax[] = [
        {
          id: 'fax_id',
          direction: 'OUTBOUND',
          to: '+12015555555',
          status: 'FAILURE',
          headerTimeZone: 'America/New_York',
          retryDelaySeconds: 60,
          callbackContentType: 'multipart/form-data',
          errorType: 'LINE_ERROR',
          errorId: 89,
          errorCode: 'The call dropped prematurely',
          projectId: 'projectId',
          serviceId: 'serviceId',
          maxRetries: 3,
          createTime: new Date('2024-02-27T12:28:09.000Z'),
          headerPageNumbers: true,
          retryCount: 3,
          contentUrl: [
            'https://developers.sinch.com/fax/fax.pdf',
          ],
          imageConversionMethod: 'HALFTONE',
          hasFile: 'true',
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
      faxesApi.list = fixture.list;
      const response = await faxesApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(response.data).toBeDefined();
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('sendFax', () => {
    it('should make a POST request to create and send a fax', async () => {
      // Given
      const requestData: Fax.SendFaxRequestData = {
        sendFaxRequestBody: {
          to: '+12015555555',
        },
      };
      const expectedResponse: Fax.Fax = {
        id: 'fax_id',
        direction: 'OUTBOUND',
        to: '+12015555555',
        status: 'IN_PROGRESS',
        headerTimeZone: 'America/New_York',
        retryDelaySeconds: 60,
        callbackContentType: 'multipart/form-data',
        projectId: 'projectId',
        serviceId: 'serviceId',
        maxRetries: 3,
        createTime: new Date('2024-02-27T12:28:09Z'),
        headerPageNumbers: true,
        contentUrl: [
          'https://developers.sinch.com/fax/fax.pdf',
        ],
        imageConversionMethod: 'HALFTONE',
      };

      // When
      fixture.send.mockResolvedValue(expectedResponse);
      faxesApi.send = fixture.send;
      const response = await faxesApi.send(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.send).toHaveBeenCalledWith(requestData);
    });
  });
});
