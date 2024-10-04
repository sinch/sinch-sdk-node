import { ApiClientOptions, SigningRequest } from '@sinch/sdk-client';
import {
  Verification,
  VerificationsApi,
  VerificationsApiFixture,
} from '../../../../src';

const _links: Verification.LinksObject[] = [
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
      const smsOptions: Verification.SmsOptions = {
        locale: 'sv-SE',
      };
      const requestData = Verification.startVerificationHelper.buildSmsRequest('+46700000000', undefined, smsOptions);
      const expectedResponse: Verification.StartSmsVerificationResponse = {
        id: 'some_verification_id',
        method: 'sms',
        sms: {
          template: 'Din verifieringskod är {{CODE}}.',
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
      const requestData = Verification.startVerificationHelper.buildFlashCallRequest('+46700000000', undefined, 30);
      const expectedResponse: Verification.StartFlashCallVerificationResponse = {
        id: 'some_verification_id',
        method: 'flashcall',
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

    it('should make a POST request to start a verification with a PhoneCall', async () => {
      // Given
      const requestData = Verification.startVerificationHelper.buildPhoneCallRequest('+46700000000');
      const expectedResponse: Verification.StartPhoneCallVerificationResponse = {
        id: 'some_verification_id',
        method: 'callout',
        _links,
      };

      // When
      fixture.startPhoneCall.mockResolvedValue(expectedResponse);
      verificationsApi.startPhoneCall = fixture.startPhoneCall;
      const response = await verificationsApi.startPhoneCall(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.startPhoneCall).toHaveBeenCalledWith(requestData);
    });

    it('should format the startPhoneCall request body', () => {
      const requestData = Verification.startVerificationHelper.buildPhoneCallRequest(
        '+46700000000',
        undefined,
        'en-US');
      const expectedResult: Verification.StartVerificationWithPhoneCallServerModel = {
        identity: {
          endpoint: '+46700000000',
          type: 'number',
        },
        calloutOptions: {
          speech: {
            locale: 'en-US',
          },
        },
      };
      const formattedRequestData = verificationsApi.performStartPhoneCallRequestBodyTransformation(
        requestData.startVerificationWithPhoneCallRequestBody);
      expect(formattedRequestData).toEqual(expectedResult);
    });

    it('should make a POST request to start a data verification (seamless)', async () => {
      // Given
      const requestData = Verification.startVerificationHelper.buildDataRequest('+46700000000');
      const expectedResponse: Verification.StartDataVerificationResponse = {
        id: 'some_verification_id',
        method: 'seamless',
        seamless: {
          targetUri: 'https://target-uri.com',
        },
      };

      // When
      fixture.startData.mockResolvedValue(expectedResponse);
      verificationsApi.startData = fixture.startData;
      const response = await verificationsApi.startData(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.startData).toHaveBeenCalledWith(requestData);
    });

    it('should make a POST request to start a verification with a Callout', async () => {
      // Given
      const requestData = Verification.startVerificationHelper.buildCalloutRequest('+46700000000');
      const expectedResponse: Verification.StartCalloutVerificationResponse = {
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

    it('should make a POST request to start a seamless verification', async () => {
      // Given
      const requestData = Verification.startVerificationHelper.buildSeamlessRequest('+46700000000');
      const expectedResponse: Verification.StartSeamlessVerificationResponse = {
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
      const requestData = Verification.reportVerificationByIdHelper.buildSmsRequest(
        'some_verification_id',
        '0000');
      const expectedResponse: Verification.SmsVerificationReportResponse = {
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
      const requestData = Verification.reportVerificationByIdHelper.buildFlashCallRequest(
        'some_verification_id',
        '+46000000000');
      const expectedResponse: Verification.FlashCallVerificationReportResponse = {
        id: 'some_verification_id',
        method: 'flashcall',
        status: 'SUCCESSFUL',
        callComplete: true,
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
      const requestData = Verification.reportVerificationByIdHelper.buildPhoneCallRequest(
        'some_verification_id',
        '0000');
      const expectedResponse: Verification.PhoneCallVerificationReportResponse = {
        id: 'some_verification_id',
        method: 'callout',
        status: 'SUCCESSFUL',
        callComplete: true,
      };

      // When
      fixture.reportPhoneCallById.mockResolvedValue(expectedResponse);
      verificationsApi.reportPhoneCallById = fixture.reportPhoneCallById;
      const response = await verificationsApi.reportPhoneCallById(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.reportPhoneCallById).toHaveBeenCalledWith(requestData);
    });

    it('should format the reportPhoneCallById request body', () => {
      const requestData = Verification.reportVerificationByIdHelper.buildPhoneCallRequest(
        'some_verification_id',
        '0000');
      const expectedResult: Verification.PhoneCallVerificationReportRequestServerModel = {
        callout: {
          code: '0000',
        },
      };
      const formattedRequestData = verificationsApi.performReportPhoneCallByIdRequestBodyTransformation(
        requestData.reportPhoneCallVerificationByIdRequestBody);
      expect(formattedRequestData).toEqual(expectedResult);
    });

    it('should make a PUT request to report the verification code (OTP) received by a callout to verify it,'
      + 'using the verification ID of the verification request', async () => {
      // Given
      const requestData = Verification.reportVerificationByIdHelper.buildCalloutRequest(
        'some_verification_id',
        '0000');
      const expectedResponse: Verification.CalloutVerificationReportResponse = {
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
      const requestData = Verification.reportVerificationByIdentityHelper.buildSmsRequest(
        '+33444555666',
        '0000');
      const expectedResponse: Verification.SmsVerificationReportResponse = {
        id: '018beea3-a942-0094-4a3a-d6b2f2c65057',
        method: 'sms',
        status: 'FAIL',
        reason: 'Fraud',
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
      const requestData = Verification.reportVerificationByIdentityHelper.buildFlashCallRequest(
        '+33444555666',
        '+46000000000',
      );
      const expectedResponse: Verification.FlashCallVerificationReportResponse = {
        id: '018beea3-a942-0094-4a3a-d6b2f2c65057',
        method: 'flashcall',
        status: 'FAIL',
        reason: 'Fraud',
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
      const requestData = Verification.reportVerificationByIdentityHelper.buildPhoneCallRequest(
        '+33444555666',
        '0000');
      const expectedResponse: Verification.PhoneCallVerificationReportResponse = {
        id: '018beea3-a942-0094-4a3a-d6b2f2c65057',
        method: 'callout',
        status: 'FAIL',
        reason: 'Expired',
        callComplete: true,
      };

      // When
      fixture.reportPhoneCallByIdentity.mockResolvedValue(expectedResponse);
      verificationsApi.reportPhoneCallByIdentity = fixture.reportPhoneCallByIdentity;
      const response = await verificationsApi.reportPhoneCallByIdentity(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.reportPhoneCallByIdentity).toHaveBeenCalledWith(requestData);
    });

    it('should format the reportPhoneCallByIdentity request body', () => {
      const requestData = Verification.reportVerificationByIdentityHelper.buildPhoneCallRequest(
        '+33444555666',
        '0000');
      const expectedResult: Verification.PhoneCallVerificationReportRequestServerModel = {
        callout: {
          code: '0000',
        },
      };
      const formattedRequestData = verificationsApi.performReportPhoneCallByIdentityRequestBodyTransformation(
        requestData.reportPhoneCallVerificationByIdentityRequestBody);
      expect(formattedRequestData).toEqual(expectedResult);
    });

    it('should make a PUT request to report the verification code (OTP) received by a callout to verify it,'
      + 'using the identity of the user', async () => {
      // Given
      const requestData = Verification.reportVerificationByIdentityHelper.buildCalloutRequest(
        '+33444555666',
        '0000');
      const expectedResponse: Verification.CalloutVerificationReportResponse = {
        id: '018beea3-a942-0094-4a3a-d6b2f2c65057',
        method: 'callout',
        status: 'FAIL',
        reason: 'Expired',
        callComplete: true,
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
