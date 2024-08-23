import {
  ApiClientOptions,
  SigningRequest,
  Verification,
  StartVerificationsApi,
  StartVerificationsApiFixture,
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

describe('StartVerificationsApi', () => {
  let startVerificationsApi: StartVerificationsApi;
  let fixture: StartVerificationsApiFixture;
  let apiClientOptions: ApiClientOptions;

  beforeEach(() => {
    fixture = new StartVerificationsApiFixture();
    apiClientOptions = {
      projectId: 'Test_ProjectId',
      requestPlugins: [new SigningRequest('keyId', 'keySecret')],
    };
    startVerificationsApi = new StartVerificationsApi(apiClientOptions);
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
      startVerificationsApi.startSms = fixture.startSms;
      const response = await startVerificationsApi.startSms(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.startSms).toHaveBeenCalledWith(requestData);
    });

    it('should format the expiry field', () => {
      const requestData = Verification.startVerificationHelper.buildSmsRequest(
        '+46700000000',
        undefined,
        { expiry: new Date('2024-02-10T13:22:34.685Z') });
      const expectedResult: Verification.StartVerificationWithSms = {
        identity: {
          endpoint: '+46700000000',
          type: 'number',
        },
        smsOptions: {
          expiry: '13:22:34',
        },
      };
      const formattedRequestData = startVerificationsApi.performStartSmsRequestBodyTransformation(
        requestData.startVerificationWithSmsRequestBody);
      expect(formattedRequestData).toEqual(expectedResult);
    });

    it('should leave the expiry field unchanged', () => {
      const requestData = Verification.startVerificationHelper.buildSmsRequest(
        '+46700000000',
        undefined,
        { expiry: '15:15:15' });
      const expectedResult: Verification.StartVerificationWithSms = {
        identity: {
          endpoint: '+46700000000',
          type: 'number',
        },
        smsOptions: {
          expiry: '15:15:15',
        },
      };
      const formattedRequestData= startVerificationsApi.performStartSmsRequestBodyTransformation(
        requestData.startVerificationWithSmsRequestBody);
      expect(formattedRequestData).toEqual(expectedResult);
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
      startVerificationsApi.startFlashCall = fixture.startFlashCall;
      const response = await startVerificationsApi.startFlashCall(requestData);

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
      startVerificationsApi.startPhoneCall = fixture.startPhoneCall;
      const response = await startVerificationsApi.startPhoneCall(requestData);

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
      const formattedRequestData = startVerificationsApi.performStartPhoneCallRequestBodyTransformation(
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
      startVerificationsApi.startData = fixture.startData;
      const response = await startVerificationsApi.startData(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.startData).toHaveBeenCalledWith(requestData);
    });

  });

});
