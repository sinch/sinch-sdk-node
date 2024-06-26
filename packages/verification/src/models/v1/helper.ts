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
import { SmsOptions } from './start-verification-request';

export const startVerificationHelper = {
  buildSmsRequest: (
    phoneNumber: string,
    reference?: string,
    smsOptions?: SmsOptions,
  ): StartSmsVerificationRequestData => {
    return {
      startVerificationWithSmsRequestBody: {
        identity: {
          type: 'number',
          endpoint: phoneNumber,
        },
        reference,
        ...(smsOptions !== undefined) ? {
          smsOptions: {
            ...smsOptions,
          },
        } : {},
      },
    };
  },
  buildCalloutRequest: (
    phoneNumber: string,
    reference?: string,
    locale?: string,
  ): StartCalloutVerificationRequestData => {
    return {
      startVerificationWithCalloutRequestBody: {
        identity: {
          type: 'number',
          endpoint: phoneNumber,
        },
        reference,
        ...(locale !== undefined) ? {
          calloutOptions: {
            speech: {
              locale,
            },
          },
        } : {},
      },
    };
  },
  buildFlashCallRequest: (
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
  buildSeamlessRequest: (
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
};
export const reportVerificationByIdHelper = {
  buildSmsRequest: (
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
  buildCalloutRequest: (
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
  buildFlashCallRequest: (
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
};
export const reportVerificationByIdentityHelper = {
  buildSmsRequest: (
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
  buildCalloutRequest: (
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
  buildFlashCallRequest: (
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
