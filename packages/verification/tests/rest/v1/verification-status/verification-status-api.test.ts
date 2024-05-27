import { ApiClientOptions, SigningRequest } from '@sinch/sdk-client';
import {
  Verification,
  VerificationStatusApi,
  VerificationStatusApiFixture,
} from '../../../../src';

describe('VerificationStatusApi', () => {
  let verificationStatusApi: VerificationStatusApi;
  let fixture: VerificationStatusApiFixture;
  let apiClientOptions: ApiClientOptions;

  beforeEach(() => {
    fixture = new VerificationStatusApiFixture();
    apiClientOptions = {
      projectId: 'Test_ProjectId',
      requestPlugins: [new SigningRequest('keyId', 'keySecret')],
    };
    verificationStatusApi = new VerificationStatusApi(apiClientOptions);
  });

  describe ('verificationStatusById', () => {
    it('should make a GET request to query the verification result by sending the verification ID', async () => {
      // Given
      const requestData: Verification.VerificationStatusByIdRequestData = {
        id: '',
      };
      const expectedResponse: Verification.SmsVerificationStatusResponse = {
        id: '018bec3e-6913-d36c-5102-ebda3fd6d30f',
        method: 'sms',
        status: 'SUCCESSFUL',
        price: {
          verificationPrice: {
            currencyId: 'EUR',
            amount: 0.0445,
          },
        },
        identity: {
          type: 'number',
          endpoint: '+33444555666',
        },
        countryId: 'FR',
        verificationTimestamp: new Date('2023-11-20T10:20:55.0667771'),
      };

      // When
      fixture.getById.mockResolvedValue(expectedResponse);
      verificationStatusApi.getById = fixture.getById;
      const response = await verificationStatusApi.getById(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.getById).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('verificationStatusByIdentity', () => {
    it('should make a GET request to query the verification result by sending the verification Identity', async () => {
      // Given
      const requestData: Verification.VerificationStatusByIdentityRequestData = {
        endpoint: '+33444555666',
        method: 'callout',
      };
      const expectedResponse: Verification.CalloutVerificationStatusResponse = {
        id: '018bec2b-d123-b7b3-833e-4b177e3420df',
        method: 'callout',
        status: 'FAIL',
        reason: 'Expired',
        price: {
          verificationPrice: {
            currencyId: 'EUR',
            amount: 0.1852,
          },
          terminationPrice: {
            currencyId: 'EUR',
            amount: 0,
          },
        },
        identity: {
          type: 'number',
          endpoint: '+33444555666',
        },
        countryId: 'FR',
        verificationTimestamp: new Date('2023-11-20T10:20:55.0667771'),
        callComplete: true,
        callResult: 'ANSWERED',
      };

      // When
      fixture.getByIdentity.mockResolvedValue(expectedResponse);
      verificationStatusApi.getByIdentity = fixture.getByIdentity;
      const response = await verificationStatusApi.getByIdentity(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.getByIdentity).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('verificationStatusByReference', () => {
    it('should make a GET request to query the verification result by sending the verification reference', async () => {
      // Given
      const requestData: Verification.VerificationStatusByReferenceRequestData = {
        reference: 'reference',
      };
      const expectedResponse: Verification.FlashCallVerificationStatusResponse = {
        id: '018beea3-a942-0094-4a3a-d6b2f2c65057',
        reference: 'reference',
        method: 'flashcall',
        status: 'FAIL',
        reason: 'Expired',
        price: {
          verificationPrice: {
            currencyId: 'EUR',
            amount: 0.0308,
          },
          terminationPrice: {
            currencyId: 'EUR',
            amount: 0,
          },
        },
        identity: {
          type: 'number',
          endpoint: '+33444555666',
        },
        countryId: 'FR',
        verificationTimestamp: new Date('2023-11-20T21:30:29.1492828'),
        callComplete: true,
        callResult: 'ANSWERED',
      };

      // When
      fixture.getByReference.mockResolvedValue(expectedResponse);
      verificationStatusApi.getByReference = fixture.getByReference;
      const response = await verificationStatusApi.getByReference(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.getByReference).toHaveBeenCalledWith(requestData);
    });
  });
});
