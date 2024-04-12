import {
  Verification,
} from '../../../src';

const PHONE_NUMBER = '+46700000000';
const REFERENCE = 'test-reference';
const DIAL_TIMEOUT = 30;
const VERIFICATION_ID = 'a_verification_id';
const VERIFICATION_CODE = '0000';
const VERIFICATION_CLI = '+46000000000';

const identity: Verification.StartVerificationBase = {
  identity: {
    type: 'number',
    endpoint: PHONE_NUMBER,
  },
};

const identityWithReference: Verification.StartVerificationBase = {
  identity: {
    type: 'number',
    endpoint: PHONE_NUMBER,
  },
  reference: REFERENCE,
};

const identityWithFlashCall: Verification.StartVerificationWithFlashCall = {
  identity: {
    type: 'number',
    endpoint: PHONE_NUMBER,
  },
  flashCallOptions: {
    dialTimeout: DIAL_TIMEOUT,
  },
};

describe('Verification models helper', () => {

  describe('Start verification helper', () => {
    it('should build a startSms request', () => {
      const buildRequest = Verification.startVerificationHelper.buildSmsRequest(PHONE_NUMBER);
      const startRequest: Verification.StartSmsVerificationRequestData = {
        startVerificationWithSmsRequestBody: identity,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a startSms request with a reference', () => {
      const buildRequest = Verification.startVerificationHelper.buildSmsRequest(PHONE_NUMBER, REFERENCE);
      const startRequest: Verification.StartSmsVerificationRequestData = {
        startVerificationWithSmsRequestBody: identityWithReference,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a startCallout request', () => {
      const buildRequest = Verification.startVerificationHelper.buildCalloutRequest(PHONE_NUMBER);
      const startRequest: Verification.StartCalloutVerificationRequestData = {
        startVerificationWithCalloutRequestBody: identity,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a startCallout request with a reference', () => {
      const buildRequest = Verification.startVerificationHelper.buildCalloutRequest(PHONE_NUMBER, REFERENCE);
      const startRequest: Verification.StartCalloutVerificationRequestData = {
        startVerificationWithCalloutRequestBody: identityWithReference,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a startSeamless request', () => {
      const buildRequest = Verification.startVerificationHelper.buildSeamlessRequest(PHONE_NUMBER);
      const startRequest: Verification.StartSeamlessVerificationRequestData = {
        startSeamlessVerificationRequestBody: identity,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a startSeamless request with a reference', () => {
      const buildRequest = Verification.startVerificationHelper.buildSeamlessRequest(PHONE_NUMBER, REFERENCE);
      const startRequest: Verification.StartSeamlessVerificationRequestData = {
        startSeamlessVerificationRequestBody: identityWithReference,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a startFlashCall request', () => {
      const buildRequest = Verification.startVerificationHelper.buildFlashCallRequest(PHONE_NUMBER);
      const startRequest: Verification.StartFlashCallVerificationRequestData = {
        startVerificationWithFlashCallRequestBody: identity,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a startFlashCall request with a reference', () => {
      const buildRequest = Verification.startVerificationHelper.buildFlashCallRequest(PHONE_NUMBER, REFERENCE);
      const startRequest: Verification.StartFlashCallVerificationRequestData = {
        startVerificationWithFlashCallRequestBody: identityWithReference,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a startFlashCall request with a flashCall option', () => {
      const buildRequest
        = Verification.startVerificationHelper.buildFlashCallRequest(PHONE_NUMBER, undefined, DIAL_TIMEOUT);
      const startRequest: Verification.StartFlashCallVerificationRequestData = {
        startVerificationWithFlashCallRequestBody: identityWithFlashCall,
      };
      expect(buildRequest).toEqual(startRequest);
    });

  });

  describe('Report verification by Id helper', () => {

    it('should build a reportSmsVerification by Id', () => {
      const builtRequest = Verification.reportVerificationByIdHelper.buildSmsRequest(
        VERIFICATION_ID, VERIFICATION_CODE);
      const reportRequest: Verification.ReportSmsVerificationByIdRequestData = {
        id: VERIFICATION_ID,
        reportSmsVerificationByIdRequestBody: {
          sms: { code: VERIFICATION_CODE },
        },
      };
      expect(builtRequest).toEqual(reportRequest);
    });

    it('should build a reportSmsVerification by Id with code and CLI', () => {
      const builtRequest = Verification.reportVerificationByIdHelper.buildSmsRequest(
        VERIFICATION_ID, VERIFICATION_CODE, VERIFICATION_CLI);
      const reportRequest: Verification.ReportSmsVerificationByIdRequestData = {
        id: VERIFICATION_ID,
        reportSmsVerificationByIdRequestBody: {
          sms: { code: VERIFICATION_CODE, cli: VERIFICATION_CLI },
        },
      };
      expect(builtRequest).toEqual(reportRequest);
    });

    it('should build a reportCalloutVerification by Id', () => {
      const builtRequest = Verification.reportVerificationByIdHelper.buildCalloutRequest(
        VERIFICATION_ID, VERIFICATION_CODE);
      const reportRequest: Verification.ReportCalloutVerificationByIdRequestData = {
        id: VERIFICATION_ID,
        reportCalloutVerificationByIdRequestBody: {
          callout: { code: VERIFICATION_CODE },
        },
      };
      expect(builtRequest).toEqual(reportRequest);
    });

    it('should build a reportFlashCallVerification by Id', () => {
      const builtRequest = Verification.reportVerificationByIdHelper.buildFlashCallRequest(
        VERIFICATION_ID, VERIFICATION_CLI);
      const reportRequest: Verification.ReportFlashCallVerificationByIdRequestData = {
        id: VERIFICATION_ID,
        reportFlashCallVerificationByIdRequestBody: {
          flashCall: { cli: VERIFICATION_CLI },
        },
      };
      expect(builtRequest).toEqual(reportRequest);
    });
  });

  describe('Report verification by Identity helper', () => {
    it('should build a reportSmsVerification by Identity', () => {
      const builtRequest = Verification.reportVerificationByIdentityHelper.buildSmsRequest(
        PHONE_NUMBER, VERIFICATION_CODE);
      const reportRequest: Verification.ReportSmsVerificationByIdentityRequestData = {
        endpoint: PHONE_NUMBER,
        reportSmsVerificationByIdentityRequestBody: {
          sms: { code: VERIFICATION_CODE },
        },
      };
      expect(builtRequest).toEqual(reportRequest);
    });

    it('should build a reportSmsVerification by Identity with code and CLI', () => {
      const builtRequest = Verification.reportVerificationByIdentityHelper.buildSmsRequest(
        PHONE_NUMBER, VERIFICATION_CODE, VERIFICATION_CLI);
      const reportRequest: Verification.ReportSmsVerificationByIdentityRequestData = {
        endpoint: PHONE_NUMBER,
        reportSmsVerificationByIdentityRequestBody: {
          sms: { code: VERIFICATION_CODE, cli: VERIFICATION_CLI },
        },
      };
      expect(builtRequest).toEqual(reportRequest);
    });

    it('should build a reportCalloutVerification by Identity', () => {
      const builtRequest = Verification.reportVerificationByIdentityHelper.buildCalloutRequest(
        PHONE_NUMBER, VERIFICATION_CODE);
      const reportRequest: Verification.ReportCalloutVerificationByIdentityRequestData = {
        endpoint: PHONE_NUMBER,
        reportCalloutVerificationByIdentityRequestBody: {
          callout: { code: VERIFICATION_CODE },
        },
      };
      expect(builtRequest).toEqual(reportRequest);
    });

    it('should build a reportFlashCallVerification by Identity', () => {
      const builtRequest = Verification.reportVerificationByIdentityHelper.buildFlashCallRequest(
        PHONE_NUMBER, VERIFICATION_CLI);
      const reportRequest: Verification.ReportFlashCallVerificationByIdentityRequestData = {
        endpoint: PHONE_NUMBER,
        reportFlashCallVerificationByIdentityRequestBody: {
          flashCall: { cli: VERIFICATION_CLI },
        },
      };
      expect(builtRequest).toEqual(reportRequest);
    });
  });

});
