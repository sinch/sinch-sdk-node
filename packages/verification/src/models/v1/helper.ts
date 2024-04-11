import {
  ReportCalloutVerificationByIdentityRequestData,
  ReportCalloutVerificationByIdRequestData,
  ReportFlashCallVerificationByIdentityRequestData,
  ReportFlashCallVerificationByIdRequestData,
  ReportSmsVerificationByIdentityRequestData,
  ReportSmsVerificationByIdRequestData,
  StartCalloutVerificationRequestData,
  StartFlashCallVerificationRequestData,
  StartSeamlessVerificationRequestData,
  StartSmsVerificationRequestData,
} from './requests';

export const verificationsHelper = {
  buildStartSmsVerificationRequest: (
    phoneNumber: string,
    reference?: string,
  ): StartSmsVerificationRequestData => {
    return {
      startVerificationWithSmsRequestBody: {
        identity: {
          type: 'number',
          endpoint: phoneNumber,
        },
        reference,
      },
    };
  },
  buildStartCalloutVerificationRequest: (
    phoneNumber: string,
    reference?: string,
  ): StartCalloutVerificationRequestData => {
    return {
      startVerificationWithCalloutRequestBody: {
        identity: {
          type: 'number',
          endpoint: phoneNumber,
        },
        reference,
      },
    };
  },
  buildStartFlashCallVerificationRequest: (
    phoneNumber: string,
    reference?: string,
    dialTimeout?: number,
  ): StartFlashCallVerificationRequestData => {
    return {
      startVerificationWithFlashCallRequestBody: {
        identity: {
          type: 'number',
          endpoint: phoneNumber,
        },
        reference,
        ...(dialTimeout !== undefined) ? {
          flashCallOptions: {
            dialTimeout,
          },
        } : {},
      },
    };
  },
  buildStartSeamlessVerificationRequest: (
    phoneNumber: string,
    reference?: string,
  ): StartSeamlessVerificationRequestData => {
    return {
      startSeamlessVerificationRequestBody: {
        identity: {
          type: 'number',
          endpoint: phoneNumber,
        },
        reference,
      },
    };
  },
  buildReportSmsVerificationByIdRequest: (
    id: string,
    code: string,
    cli?: string,
  ): ReportSmsVerificationByIdRequestData => {
    return {
      id,
      reportSmsVerificationByIdRequestBody: {
        sms: {
          code,
          cli,
        },
      },
    };
  },
  buildReportCalloutVerificationByIdRequest: (
    id: string,
    code: string,
  ): ReportCalloutVerificationByIdRequestData => {
    return {
      id,
      reportCalloutVerificationByIdRequestBody: {
        callout: {
          code,
        },
      },
    };
  },
  buildReportFlashCallVerificationByIdRequest: (
    id: string,
    cli: string,
  ): ReportFlashCallVerificationByIdRequestData => {
    return {
      id,
      reportFlashCallVerificationByIdRequestBody: {
        flashCall: {
          cli,
        },
      },
    };
  },
  buildReportSmsVerificationByIdentityRequest: (
    identity: string,
    code: string,
    cli?: string,
  ): ReportSmsVerificationByIdentityRequestData => {
    return {
      endpoint: identity,
      reportSmsVerificationByIdentityRequestBody: {
        sms: {
          code,
          cli,
        },
      },
    };
  },
  buildReportCalloutVerificationByIdentityRequest: (
    identity: string,
    code: string,
  ): ReportCalloutVerificationByIdentityRequestData => {
    return {
      endpoint: identity,
      reportCalloutVerificationByIdentityRequestBody: {
        callout: {
          code,
        },
      },
    };
  },
  buildReportFlashCallVerificationByIdentityRequest: (
    identity: string,
    cli: string,
  ): ReportFlashCallVerificationByIdentityRequestData => {
    return {
      endpoint: identity,
      reportFlashCallVerificationByIdentityRequestBody: {
        flashCall: {
          cli,
        },
      },
    };
  },
};
