import { ApiClientOptions, SigningRequest } from '@sinch/sdk-client';
import {
  InitiateVerificationResponse,
  ReportVerificationByIdentityRequestData,
  ReportVerificationByIdRequestData,
  StartVerificationRequestData,
  VerificationResponse,
  VerificationsApi,
  VerificationsApiFixture,
} from '../../../../src';

describe('VerificationsApi', () => {
  let verificationsApi: VerificationsApi;
  let fixture: VerificationsApiFixture;
  let apiClientOptions: ApiClientOptions;

  beforeEach(() => {
    fixture = new VerificationsApiFixture();
    apiClientOptions = {
      projectId: 'Test_ProjectId',
      requestPlugins: [new SigningRequest('keyId', 'keySecret')],
    };
    verificationsApi = new VerificationsApi(apiClientOptions);
  });

  describe ('startVerification', () => {
    it('should make a POST request to start a verification', async () => {
      // Given
      const requestData: StartVerificationRequestData = {
        initiateVerificationRequestBody: {
          identity: {
            type: 'number',
            endpoint: '+33444555666',
          },
          method: 'sms',
        },
      };
      const expectedResponse: InitiateVerificationResponse = {
        id: '018bdf5b-8e85-1d11-d2ed-710fb8a2861f',
        method: 'sms',
        sms: {
          template: 'Your verification code is {{CODE}}. Verified by Sinch',
          interceptionTimeout: 298,
        },
        _links: [
          {
            rel: "status",
            href: "https://dc-euc1-std.verification.api.sinch.com/verification/v1/verifications/id/018bdf5b-8e85-1d11-d2ed-710fb8a2861f",
            method: "GET",
          },
          {
            rel: "report",
            href: "https://dc-euc1-std.verification.api.sinch.com/verification/v1/verifications/id/018bdf5b-8e85-1d11-d2ed-710fb8a2861f",
            method: "PUT",
          },
        ],
      };

      // When
      fixture.start.mockResolvedValue(expectedResponse);
      verificationsApi.start = fixture.start;
      const response = await verificationsApi.start(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.start).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('reportVerificationById', () => {
    it('should make a PUT request to report the received verification code to verify it,'
      + 'using the verification ID of the verification request', async () => {
      // Given
      const requestData: ReportVerificationByIdRequestData = {
        id: '018bdf5b-8e85-1d11-d2ed-710fb8a2861f',
        verificationReportRequestBody: {
          method: 'sms',
          sms: {
            code: '0000',
          },
        },
      };
      const expectedResponse: VerificationResponse = {
        id: '018bdf5b-8e85-1d11-d2ed-710fb8a2861f',
        method: 'sms',
        status: 'SUCCESSFUL',
      };

      // When
      fixture.reportById.mockResolvedValue(expectedResponse);
      verificationsApi.reportById = fixture.reportById;
      const response = await verificationsApi.reportById(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.reportById).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('reportVerificationByIdentity', () => {
    it('should make a PUT request to report the received verification code to verify it,'
      + 'using the identity of the user', async () => {
      // Given
      const requestData: ReportVerificationByIdentityRequestData = {
        endpoint: '+33444555666',
        verificationReportRequestBody: {
          method: 'flashCall',
          flashCall: {
            cli: '+17813334444',
          },
        },
      };
      const expectedResponse: VerificationResponse = {
        id: '018beea3-a942-0094-4a3a-d6b2f2c65057',
        method: 'flashcall',
        status: 'FAIL',
        reason: 'Expired',
        callComplete: true,
      };

      // When
      fixture.reportByIdentity.mockResolvedValue(expectedResponse);
      verificationsApi.reportByIdentity = fixture.reportByIdentity;
      const response = await verificationsApi.reportByIdentity(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.reportByIdentity).toHaveBeenCalledWith(requestData);
    });
  });

});
