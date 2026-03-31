import { SinchClientParameters } from '@sinch/sdk-client';
import { ConsentsApi, ConsentsApiFixture, Conversation, LazyConversationApiClient } from '../../../../src';

describe('ConsentsApi', () => {
  let consentsApi: ConsentsApi;
  let fixture: ConsentsApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new ConsentsApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const lazyClient = new LazyConversationApiClient(credentials);
    consentsApi = new ConsentsApi(lazyClient);
  });


  describe ('getConsents', () => {
    it('should make a GET request to get all identities within a consent list', async () => {
      // Given
      const requestData: Conversation.ListIdentitiesRequestData = {
        app_id: 'app_id',
        list_type: 'OPT_OUT_ALL',
      };
      const mockData: Conversation.ConsentIdentity[] = [
        {
          identity: '33612345678',
        },
      ];
      const expectedResponse = {
        data: mockData,
        hasNextPage: false,
        nextPageValue: '',
        nextPage: jest.fn(),
      };

      // When
      fixture.listIdentities.mockResolvedValue(expectedResponse);
      consentsApi.listIdentities = fixture.listIdentities;
      const response = await consentsApi.listIdentities(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.listIdentities).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getConsentsAuditRecords', () => {
    it('should make a GET request to get all audit records associated with an identity', async () => {
      // Given
      const requestData: Conversation.ListAuditRecordsRequestData = {
        app_id: 'app_id',
        identity: '33612345678',
      };
      const expectedResponse: Conversation.AuditRecordsList = {
        identity: {
          identity: '33612345678',
        },
        audit_records: [
          {
            operation: 'OPERATION_INSERT',
            list_type: 'OPT_OUT_ALL',
            project_id: 'project_id',
            app_id: 'app_id',
            datetime: new Date('2025-06-06T14:42:56.031323Z'),
            origin: 'ORIGIN_MO',
          },
        ],
      };

      // When
      fixture.listAuditRecords.mockResolvedValue(expectedResponse);
      consentsApi.listAuditRecords = fixture.listAuditRecords;
      const response = await consentsApi.listAuditRecords(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.listAuditRecords).toHaveBeenCalledWith(requestData);
    });
  });
});
