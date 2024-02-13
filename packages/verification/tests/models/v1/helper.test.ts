import {
  ReportCalloutVerificationByIdentityRequestData,
  ReportCalloutVerificationByIdRequestData, ReportFlashCallVerificationByIdentityRequestData,
  ReportFlashCallVerificationByIdRequestData,
  ReportSmsVerificationByIdentityRequestData,
  ReportSmsVerificationByIdRequestData,
  StartCalloutVerificationRequestData,
  StartFlashCallVerificationRequestData,
  StartSeamlessVerificationRequestData,
  StartSmsVerificationRequestData,
  StartVerificationBase,
  StartVerificationWithFlashCall,
  verificationsHelper,
} from '../../../src';

const PHONE_NUMBER = '+46700000000';
const REFERENCE = 'test-reference';
const DIAL_TIMEOUT = 30;
const VERIFICATION_ID = "a_verification_id";
const VERIFICATION_CODE = '0000';
const VERIFICATION_CLI = '+46000000000';

const identity: StartVerificationBase = {
  identity: {
    type: 'number',
    endpoint: PHONE_NUMBER,
  },
};

const identityWithReference: StartVerificationBase = {
  identity: {
    type: 'number',
    endpoint: PHONE_NUMBER,
  },
  reference: REFERENCE,
};

const identityWithFlashCall: StartVerificationWithFlashCall = {
  identity: {
    type: 'number',
    endpoint: PHONE_NUMBER,
  },
  flashCallOptions: {
    dialTimeout: DIAL_TIMEOUT,
  },
};

describe('Verification models helper', () => {

  describe('Verifications helper', () => {
    it('should build a startSms request', () => {
      const buildRequest = verificationsHelper.buildStartSmsVerificationRequest(PHONE_NUMBER);
      const startRequest: StartSmsVerificationRequestData = {
        startVerificationWithSmsRequestBody: identity,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a startSms request with a reference', () => {
      const buildRequest = verificationsHelper.buildStartSmsVerificationRequest(PHONE_NUMBER, REFERENCE);
      const startRequest: StartSmsVerificationRequestData = {
        startVerificationWithSmsRequestBody: identityWithReference,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a startCallout request', () => {
      const buildRequest = verificationsHelper.buildStartCalloutVerificationRequest(PHONE_NUMBER);
      const startRequest: StartCalloutVerificationRequestData = {
        startVerificationWithCalloutRequestBody: identity,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a startCallout request with a reference', () => {
      const buildRequest = verificationsHelper.buildStartCalloutVerificationRequest(PHONE_NUMBER, REFERENCE);
      const startRequest: StartCalloutVerificationRequestData = {
        startVerificationWithCalloutRequestBody: identityWithReference,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a startSeamless request', () => {
      const buildRequest = verificationsHelper.buildStartSeamlessVerificationRequest(PHONE_NUMBER);
      const startRequest: StartSeamlessVerificationRequestData = {
        startSeamlessVerificationRequestBody: identity,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a startSeamless request with a reference', () => {
      const buildRequest = verificationsHelper.buildStartSeamlessVerificationRequest(PHONE_NUMBER, REFERENCE);
      const startRequest: StartSeamlessVerificationRequestData = {
        startSeamlessVerificationRequestBody: identityWithReference,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a startFlashCall request', () => {
      const buildRequest = verificationsHelper.buildStartFlashCallVerificationRequest(PHONE_NUMBER);
      const startRequest: StartFlashCallVerificationRequestData = {
        startVerificationWithFlashCallRequestBody: identity,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a startFlashCall request with a reference', () => {
      const buildRequest = verificationsHelper.buildStartFlashCallVerificationRequest(PHONE_NUMBER, REFERENCE);
      const startRequest: StartFlashCallVerificationRequestData = {
        startVerificationWithFlashCallRequestBody: identityWithReference,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a startFlashCall request with a flashCall option', () => {
      const buildRequest
        = verificationsHelper.buildStartFlashCallVerificationRequest(PHONE_NUMBER, undefined, DIAL_TIMEOUT);
      const startRequest: StartFlashCallVerificationRequestData = {
        startVerificationWithFlashCallRequestBody: identityWithFlashCall,
      };
      expect(buildRequest).toEqual(startRequest);
    });

    it('should build a reportSmsVerification by Id', () => {
      const builtRequest = verificationsHelper.buildReportSmsVerificationByIdRequest(
        VERIFICATION_ID, VERIFICATION_CODE);
      const reportRequest: ReportSmsVerificationByIdRequestData = {
        id: VERIFICATION_ID,
        reportSmsVerificationByIdRequestBody: {
          sms: { code: VERIFICATION_CODE },
        },
      };
      expect(builtRequest).toEqual(reportRequest);
    });

    it('should build a reportSmsVerification by Id with code and CLI', () => {
      const builtRequest = verificationsHelper.buildReportSmsVerificationByIdRequest(
        VERIFICATION_ID, VERIFICATION_CODE, VERIFICATION_CLI);
      const reportRequest: ReportSmsVerificationByIdRequestData = {
        id: VERIFICATION_ID,
        reportSmsVerificationByIdRequestBody: {
          sms: { code: VERIFICATION_CODE, cli: VERIFICATION_CLI },
        },
      };
      expect(builtRequest).toEqual(reportRequest);
    });

    it('should build a reportCalloutVerification by Id', () => {
      const builtRequest = verificationsHelper.buildReportCalloutVerificationByIdRequest(
        VERIFICATION_ID, VERIFICATION_CODE);
      const reportRequest: ReportCalloutVerificationByIdRequestData = {
        id: VERIFICATION_ID,
        reportCalloutVerificationByIdRequestBody: {
          callout: { code: VERIFICATION_CODE },
        },
      };
      expect(builtRequest).toEqual(reportRequest);
    });

    it('should build a reportFlashCallVerification by Id', () => {
      const builtRequest = verificationsHelper.buildReportFlashCallVerificationByIdRequest(
        VERIFICATION_ID, VERIFICATION_CLI);
      const reportRequest: ReportFlashCallVerificationByIdRequestData = {
        id: VERIFICATION_ID,
        reportFlashCallVerificationByIdRequestBody: {
          flashCall: { cli: VERIFICATION_CLI },
        },
      };
      expect(builtRequest).toEqual(reportRequest);
    });

    it('should build a reportSmsVerification by Identity', () => {
      const builtRequest = verificationsHelper.buildReportSmsVerificationByIdentityRequest(
        PHONE_NUMBER, VERIFICATION_CODE);
      const reportRequest: ReportSmsVerificationByIdentityRequestData = {
        endpoint: PHONE_NUMBER,
        reportSmsVerificationByIdentityRequestBody: {
          sms: { code: VERIFICATION_CODE },
        },
      };
      expect(builtRequest).toEqual(reportRequest);
    });

    it('should build a reportSmsVerification by Identity with code and CLI', () => {
      const builtRequest = verificationsHelper.buildReportSmsVerificationByIdentityRequest(
        PHONE_NUMBER, VERIFICATION_CODE, VERIFICATION_CLI);
      const reportRequest: ReportSmsVerificationByIdentityRequestData = {
        endpoint: PHONE_NUMBER,
        reportSmsVerificationByIdentityRequestBody: {
          sms: { code: VERIFICATION_CODE, cli: VERIFICATION_CLI },
        },
      };
      expect(builtRequest).toEqual(reportRequest);
    });

    it('should build a reportCalloutVerification by Identity', () => {
      const builtRequest = verificationsHelper.buildReportCalloutVerificationByIdentityRequest(
        PHONE_NUMBER, VERIFICATION_CODE);
      const reportRequest: ReportCalloutVerificationByIdentityRequestData = {
        endpoint: PHONE_NUMBER,
        reportCalloutVerificationByIdentityRequestBody: {
          callout: { code: VERIFICATION_CODE },
        },
      };
      expect(builtRequest).toEqual(reportRequest);
    });

    it('should build a reportFlashCallVerification by Identity', () => {
      const builtRequest = verificationsHelper.buildReportFlashCallVerificationByIdentityRequest(
        PHONE_NUMBER, VERIFICATION_CLI);
      const reportRequest: ReportFlashCallVerificationByIdentityRequestData = {
        endpoint: PHONE_NUMBER,
        reportFlashCallVerificationByIdentityRequestBody: {
          flashCall: { cli: VERIFICATION_CLI },
        },
      };
      expect(builtRequest).toEqual(reportRequest);
    });
  });

});
