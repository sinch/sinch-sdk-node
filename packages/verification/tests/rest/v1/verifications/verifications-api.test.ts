import { ApiClientOptions, SigningRequest } from '@sinch/sdk-client';
import {
  StartCalloutVerificationResponse,
  CalloutVerificationReportResponse,
  StartSeamlessVerificationResponse,
  StartFlashCallVerificationResponse,
  FlashCallVerificationReportResponse,
  LinksObject,
  StartSmsVerificationResponse,
  SMSVerificationReportResponse,
  VerificationsApi,
  VerificationsApiFixture,
  verificationsHelper,
} from '../../../../src';

const _links: LinksObject[] = [
  {
    rel: 'status',
    href: 'https://dc-euc1-std.verification.api.sinch.com/verification/v1/verifications/id/some_verification_id',
    method: 'GET',
  },
  {
    rel: 'report',
    href: 'https://dc-euc1-std.verification.api.sinch.com/verification/v1/verifications/id/some_verification_id',
    method: 'PUT',
  },
];

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
    it('should make a POST request to start a verification with an SMS', async () => {
      // Given
      const requestData = verificationsHelper.buildStartSmsVerificationRequest('+46700000000');
      const expectedResponse: StartSmsVerificationResponse = {
        id: 'some_verification_id',
        method: 'sms',
        sms: {
          template: 'Your verification code is {{CODE}}. Verified by Sinch',
          interceptionTimeout: 298,
        },
        _links,
      };

      // When
      fixture.startSms.mockResolvedValue(expectedResponse);
      verificationsApi.startSms = fixture.startSms;
      const response = await verificationsApi.startSms(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.startSms).toHaveBeenCalledWith(requestData);
    });

    it('should make a POST request to start a verification with a FlashCall', async () => {
      // Given
      const requestData = verificationsHelper.buildStartFlashCallVerificationRequest('+46700000000', undefined, 30);
      const expectedResponse: StartFlashCallVerificationResponse = {
        id: 'some_verification_id',
        method: 'flashCall',
        flashCall: {
          cliFilter: '(.*)70123(.*)',
          interceptionTimeout: 60,
          reportTimeout: 120,
          denyCallAfter: 120,
        },
        _links,
      };

      // When
      fixture.startFlashCall.mockResolvedValue(expectedResponse);
      verificationsApi.startFlashCall = fixture.startFlashCall;
      const response = await verificationsApi.startFlashCall(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.startFlashCall).toHaveBeenCalledWith(requestData);
    });

    it('should make a POST request to start a verification with a Callout', async () => {
      // Given
      const requestData = verificationsHelper.buildStartCalloutVerificationRequest('+46700000000');
      const expectedResponse: StartCalloutVerificationResponse = {
        id: 'some_verification_id',
        method: 'callout',
        _links,
      };

      // When
      fixture.startCallout.mockResolvedValue(expectedResponse);
      verificationsApi.startCallout = fixture.startCallout;
      const response = await verificationsApi.startCallout(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.startCallout).toHaveBeenCalledWith(requestData);
    });

    it('should make a POST request to start a data verification (seamless)', async () => {
      // Given
      const requestData = verificationsHelper.buildStartSeamlessVerificationRequest('+46700000000');
      const expectedResponse: StartSeamlessVerificationResponse = {
        id: 'some_verification_id',
        method: 'seamless',
        seamless: {
          targetUri: 'https://target-uri.com',
        },
      };

      // When
      fixture.startSeamless.mockResolvedValue(expectedResponse);
      verificationsApi.startSeamless = fixture.startSeamless;
      const response = await verificationsApi.startSeamless(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.startSeamless).toHaveBeenCalledWith(requestData);
    });

  });

  describe ('reportVerificationById', () => {
    it('should make a PUT request to report the verification code (OTP) received by SMS to verify it,'
      + 'using the verification ID of the verification request', async () => {
      // Given
      const requestData = verificationsHelper.buildReportSmsVerificationByIdRequest(
        'some_verification_id',
        '0000');
      const expectedResponse: SMSVerificationReportResponse = {
        id: 'some_verification_id',
        method: 'sms',
        status: 'SUCCESSFUL',
      };

      // When
      fixture.reportSmsById.mockResolvedValue(expectedResponse);
      verificationsApi.reportSmsById = fixture.reportSmsById;
      const response = await verificationsApi.reportSmsById(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.reportSmsById).toHaveBeenCalledWith(requestData);
    });

    it('should make a PUT request to report the CLI received by FlashCall to verify it,'
      + 'using the verification ID of the verification request', async () => {
      // Given
      const requestData = verificationsHelper.buildReportFlashCallVerificationByIdRequest(
        'some_verification_id',
        '+46000000000');
      const expectedResponse: FlashCallVerificationReportResponse = {
        id: 'some_verification_id',
        method: 'flashcall',
        status: 'SUCCESSFUL',
        price: {
          verificationPrice: {
            currencyId: 'USD',
            amount: 0.0127,
          },
          terminationPrice: {
            currencyId: 'USD',
            amount: 0.0127,
          },
          billableDuration: 42,
        },
      };

      // When
      fixture.reportFlashCallById.mockResolvedValue(expectedResponse);
      verificationsApi.reportFlashCallById = fixture.reportFlashCallById;
      const response = await verificationsApi.reportFlashCallById(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.reportFlashCallById).toHaveBeenCalledWith(requestData);
    });

    it('should make a PUT request to report the verification code (OTP) received by a phone call to verify it,'
      + 'using the verification ID of the verification request', async () => {
      // Given
      const requestData = verificationsHelper.buildReportCalloutVerificationByIdRequest(
        'some_verification_id',
        '0000');
      const expectedResponse: CalloutVerificationReportResponse = {
        id: 'some_verification_id',
        method: 'callout',
        status: 'SUCCESSFUL',
        callComplete: true,
      };

      // When
      fixture.reportCalloutById.mockResolvedValue(expectedResponse);
      verificationsApi.reportCalloutById = fixture.reportCalloutById;
      const response = await verificationsApi.reportCalloutById(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.reportCalloutById).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('reportVerificationByIdentity', () => {
    it('should make a PUT request to report the verification code (OTP) received by SMS to verify it,'
      + 'using the identity of the user', async () => {
      // Given
      const requestData = verificationsHelper.buildReportSmsVerificationByIdentityRequest(
        '+33444555666',
        '0000');
      const expectedResponse: SMSVerificationReportResponse = {
        id: '018beea3-a942-0094-4a3a-d6b2f2c65057',
        method: 'sms',
        status: 'FAIL',
        reason: 'Fraud',
        price: {
          verificationPrice: {
            currencyId: 'USD',
            amount: 0.0127,
          },
        },
        source: 'intercepted',
      };

      // When
      fixture.reportSmsByIdentity.mockResolvedValue(expectedResponse);
      verificationsApi.reportSmsByIdentity = fixture.reportSmsByIdentity;
      const response = await verificationsApi.reportSmsByIdentity(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.reportSmsByIdentity).toHaveBeenCalledWith(requestData);
    });

    it('should make a PUT request to report the CLI received by FlashCall to verify it,'
      + 'using the identity of the user', async () => {
      // Given
      const requestData = verificationsHelper.buildReportFlashCallVerificationByIdentityRequest(
        '+33444555666',
        '+46000000000',
      );
      const expectedResponse: FlashCallVerificationReportResponse = {
        id: '018beea3-a942-0094-4a3a-d6b2f2c65057',
        method: 'flashcall',
        status: 'FAIL',
        reason: 'Fraud',
        price: {
          verificationPrice: {
            currencyId: 'USD',
            amount: 0.0127,
          },
          terminationPrice: {
            currencyId: 'USD',
            amount: 0.0127,
          },
          billableDuration: 42,
        },
        source: 'intercepted',
      };

      // When
      fixture.reportFlashCallByIdentity.mockResolvedValue(expectedResponse);
      verificationsApi.reportFlashCallByIdentity = fixture.reportFlashCallByIdentity;
      const response = await verificationsApi.reportFlashCallByIdentity(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.reportFlashCallByIdentity).toHaveBeenCalledWith(requestData);
    });

    it('should make a PUT request to report the verification code (OTP) received by a phone call to verify it,'
      + 'using the identity of the user', async () => {
      // Given
      const requestData = verificationsHelper.buildReportCalloutVerificationByIdentityRequest(
        '+33444555666',
        '0000');
      const expectedResponse: CalloutVerificationReportResponse = {
        id: '018beea3-a942-0094-4a3a-d6b2f2c65057',
        method: 'callout',
        status: 'FAIL',
        reason: 'Expired',
        callComplete: true,
        price: {
          verificationPrice: {
            currencyId: 'USD',
            amount: 0.0127,
          },
          terminationPrice: {
            currencyId: 'USD',
            amount: 0.0127,
          },
          billableDuration: 42,
        },
      };

      // When
      fixture.reportCalloutByIdentity.mockResolvedValue(expectedResponse);
      verificationsApi.reportCalloutByIdentity = fixture.reportCalloutByIdentity;
      const response = await verificationsApi.reportCalloutByIdentity(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.reportCalloutByIdentity).toHaveBeenCalledWith(requestData);
    });
  });

});
