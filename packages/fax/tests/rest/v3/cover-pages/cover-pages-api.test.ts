import { SinchClientParameters } from '@sinch/sdk-client';
import {
  CoverPagesApi,
  CoverPagesApiFixture,
  Fax,
  LazyFaxApiClient,
} from '../../../../src';

describe('CoverPagesApi', () => {
  let coverPagesApi: CoverPagesApi;
  let fixture: CoverPagesApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new CoverPagesApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const lazyClient = new LazyFaxApiClient(credentials);
    coverPagesApi = new CoverPagesApi(lazyClient);
  });


  describe ('addCoverPage', () => {
    it('should make a POST request to add a cover page to the service', async () => {
      // Given
      const requestData: Fax.AddCoverPageRequestData = {
        serviceId: '01GVRB50KEQFFE1SGMPFRNBG6J',
        addCoverPageRequestBody: {
          name: 'Acme Company cover page',
          file: {
            fileContent: 'c3RyaW5n',
            fileType: 'PDF',
          },
        },
      };
      const expectedResponse: Fax.CoverPage = {
        id: '01K5W528RASFKYNCDS9YWTZ1CX',
        name: 'Acme Company cover page',
        file: {
          fileContent: 'c3RyaW5n',
          fileType: 'application/pdf',
        },
        projectId: 'ae00f005-e392-44dc-b3f5-a657a2684dg3',
        serviceId: '01GVRB50KEQFFE1SGMPFRNBG6J',
        createdTime: new Date('2024-02-27T12:28:09Z'),
        updatedTime: new Date('2024-02-27T12:28:09Z'),
      };

      // When
      fixture.add.mockResolvedValue(expectedResponse);
      coverPagesApi.add = fixture.add;
      const response = await coverPagesApi.add(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.add).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteCoverPage', () => {
    it('should make a DELETE request to delete a cover page from a service', async () => {
      // Given
      const requestData: Fax.DeleteCoverPageRequestData = {
        serviceId: '01GVRB50KEQFFE1SGMPFRNBG6J',
        coverPageId: '01K5W528RASFKYNCDS9YWTZ1CX',
      };
      const expectedResponse: void = undefined;

      // When
      fixture.delete.mockResolvedValue(expectedResponse);
      coverPagesApi.delete = fixture.delete;
      const response = await coverPagesApi.delete(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getCoverPage', () => {
    it('should make a GET request to get a cover page by its ID', async () => {
      // Given
      const requestData: Fax.GetCoverPageRequestData = {
        serviceId: '01GVRB50KEQFFE1SGMPFRNBG6J',
        coverPageId: '01K5W528RASFKYNCDS9YWTZ1CX',
      };
      const expectedResponse: Fax.CoverPage = {
        id: '',
        name: 'Acme Company cover page',
        file: {
          fileContent: 'c3RyaW5n',
          fileType: 'application/pdf',
        },
        projectId: 'ae00f005-e392-44dc-b3f5-a657a2684dg3',
        serviceId: '01GVRB50KEQFFE1SGMPFRNBG6J',
        createdTime: new Date('2024-02-27T12:28:09Z'),
        updatedTime: new Date('2024-02-27T12:28:09Z'),
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      coverPagesApi.get = fixture.get;
      const response = await coverPagesApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listCoverPages', () => {
    it('should make a GET request to list all cover pages for a service', async () => {
      // Given
      const requestData: Fax.ListCoverPagesRequestData = {
        serviceId: '01GVRB50KEQFFE1SGMPFRNBG6J',
      };
      const mockData: Fax.CoverPage[] = [
        {
          id: '01K5W528RASFKYNCDS9YWTZ1CX',
          name: 'Acme Company cover page',
          file: {
            fileContent: 'c3RyaW5n',
            fileType: 'application/pdf',
          },
          projectId: 'ae00f005-e392-44dc-b3f5-a657a2684dg3',
          serviceId: '01GVRB50KEQFFE1SGMPFRNBG6J',
          createdTime: new Date('2024-02-27T12:28:09Z'),
          updatedTime: new Date('2024-02-27T12:28:09Z'),
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
      coverPagesApi.list = fixture.list;
      const response = await coverPagesApi.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });
});
