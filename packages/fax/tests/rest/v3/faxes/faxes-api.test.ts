import { DateFormat, FileBuffer, SinchClientParameters } from '@sinch/sdk-client';
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
        callbackUrlContentType: 'multipart/form-data',
        errorType: 'LINE_ERROR',
        errorCode: 89,
        errorMessage: 'The call dropped prematurely',
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
          callbackUrlContentType: 'multipart/form-data',
          errorType: 'LINE_ERROR',
          errorCode: 89,
          errorMessage: 'The call dropped prematurely',
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

    it('should format a createTime parameter', () => {
      const dateUndefined = undefined;
      let formattedDateFilter = faxesApi.formatCreateTimeFilter(dateUndefined);
      expect(formattedDateFilter).toBeUndefined();

      const dateString =  '2024-05-01';
      formattedDateFilter = faxesApi.formatCreateTimeFilter(dateString);
      expect(formattedDateFilter).toBe('2024-05-01');

      const dateWithSecondsString ='2024-05-01T13:00:00Z';
      formattedDateFilter = faxesApi.formatCreateTimeFilter(dateWithSecondsString);
      expect(formattedDateFilter).toBe('2024-05-01');

      const dateWithSeconds = new Date('2024-05-01T13:00:00Z');
      formattedDateFilter = faxesApi.formatCreateTimeFilter(dateWithSeconds);
      expect(formattedDateFilter).toBe('2024-05-01');
    });

    it('should format a datetime range filter', () => {
      const dateTimeRangeUndefined = undefined;
      let formattedDateTimeRangeFilter = faxesApi.formatCreateTimeRangeFilter(dateTimeRangeUndefined);
      expect(formattedDateTimeRangeFilter).toBeUndefined();

      const dateTimeRangeString = '2024-05-01';
      formattedDateTimeRangeFilter = faxesApi.formatCreateTimeRangeFilter(dateTimeRangeString);
      expect(formattedDateTimeRangeFilter).toBe('2024-05-01');

      const dateTimeRangeNoUnit: DateFormat = {
        date: new Date('2024-05-01T13:15:30Z'),
      };
      formattedDateTimeRangeFilter = faxesApi.formatCreateTimeRangeFilter(dateTimeRangeNoUnit);
      expect(formattedDateTimeRangeFilter).toBe('2024-05-01T13:15:30Z');

      const dateTimeRangeWithYear: DateFormat = {
        date: new Date('2024-05-01T13:15:30Z'),
        unit: 'year',
      };
      formattedDateTimeRangeFilter = faxesApi.formatCreateTimeRangeFilter(dateTimeRangeWithYear);
      expect(formattedDateTimeRangeFilter).toBe('2024');

      const dateTimeRangeWithMonth: DateFormat = {
        date: new Date('2024-05-01T13:15:30Z'),
        unit: 'month',
      };
      formattedDateTimeRangeFilter = faxesApi.formatCreateTimeRangeFilter(dateTimeRangeWithMonth);
      expect(formattedDateTimeRangeFilter).toBe('2024-05');

      const dateTimeRangeWithDay: DateFormat = {
        date: new Date('2024-05-01T13:15:30Z'),
        unit: 'day',
      };
      formattedDateTimeRangeFilter = faxesApi.formatCreateTimeRangeFilter(dateTimeRangeWithDay);
      expect(formattedDateTimeRangeFilter).toBe('2024-05-01');

      const dateTimeRangeWithHours: DateFormat = {
        date: new Date('2024-05-01T13:15:30Z'),
        unit: 'hour',
      };
      formattedDateTimeRangeFilter = faxesApi.formatCreateTimeRangeFilter(dateTimeRangeWithHours);
      expect(formattedDateTimeRangeFilter).toBe('2024-05-01T13:00:00Z');

      const dateTimeRangeWithMinutes: DateFormat = {
        date: new Date('2024-05-01T13:15:30Z'),
        unit: 'minute',
      };
      formattedDateTimeRangeFilter = faxesApi.formatCreateTimeRangeFilter(dateTimeRangeWithMinutes);
      expect(formattedDateTimeRangeFilter).toBe('2024-05-01T13:15:00Z');

      const dateTimeRangeWithSeconds: DateFormat = {
        date: new Date('2024-05-01T13:15:30Z'),
        unit: 'second',
      };
      formattedDateTimeRangeFilter = faxesApi.formatCreateTimeRangeFilter(dateTimeRangeWithSeconds);
      expect(formattedDateTimeRangeFilter).toBe('2024-05-01T13:15:30Z');
    });
  });

  describe ('sendFax', () => {
    it('should make a POST request to create and send a fax', async () => {
      // Given
      const requestData: Fax.SendSingleFaxRequestData = {
        sendFaxRequestBody: {
          to: '+12015555555',
        },
      };
      const expectedResponse: Fax.Fax[] = [
        {
          id: 'fax_id',
          direction: 'OUTBOUND',
          to: '+12015555555',
          status: 'IN_PROGRESS',
          headerTimeZone: 'America/New_York',
          retryDelaySeconds: 60,
          callbackUrlContentType: 'multipart/form-data',
          projectId: 'projectId',
          serviceId: 'serviceId',
          maxRetries: 3,
          createTime: new Date('2024-02-27T12:28:09Z'),
          headerPageNumbers: true,
          contentUrl: [
            'https://developers.sinch.com/fax/fax.pdf',
          ],
          imageConversionMethod: 'HALFTONE',
        },
      ];

      // When
      fixture.send.mockResolvedValue(expectedResponse);
      faxesApi.send = fixture.send;
      const response = await faxesApi.send(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.send).toHaveBeenCalledWith(requestData);
    });

    it('should make a POST request to create and send multiple faxes', async () => {
      // Given
      const requestData: Fax.SendMultipleFaxRequestData = {
        sendFaxRequestBody: {
          to: ['+12015555555', '+12015555566'],
        },
      };
      const expectedResponse: Fax.Fax[] = [
        {
          id: 'fax_id',
          direction: 'OUTBOUND',
          to: '+12015555555',
          status: 'IN_PROGRESS',
          headerTimeZone: 'America/New_York',
          retryDelaySeconds: 60,
          callbackUrlContentType: 'multipart/form-data',
          projectId: 'projectId',
          serviceId: 'serviceId',
          maxRetries: 3,
          createTime: new Date('2024-02-27T12:28:09Z'),
          headerPageNumbers: true,
          contentUrl: [
            'https://developers.sinch.com/fax/fax.pdf',
          ],
          imageConversionMethod: 'HALFTONE',
        },
        {
          id: 'fax_id',
          direction: 'OUTBOUND',
          to: '+12015555566',
          status: 'IN_PROGRESS',
          headerTimeZone: 'America/New_York',
          retryDelaySeconds: 60,
          callbackUrlContentType: 'multipart/form-data',
          projectId: 'projectId',
          serviceId: 'serviceId',
          maxRetries: 3,
          createTime: new Date('2024-02-27T12:28:09Z'),
          headerPageNumbers: true,
          contentUrl: [
            'https://developers.sinch.com/fax/fax.pdf',
          ],
          imageConversionMethod: 'HALFTONE',
        },
      ];

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
