import {
  ReportCalloutVerificationByIdentityRequestData,
  ReportCalloutVerificationByIdRequestData,
  ReportFlashCallVerificationByIdentityRequestData,
  ReportFlashCallVerificationByIdRequestData,
  ReportSmsVerificationByIdentityRequestData,
  ReportSmsVerificationByIdRequestData,
  StartCalloutVerificationRequestData,
  StartDataVerificationRequestData,
  StartFlashCallVerificationRequestData,
  StartPhoneCallVerificationRequestData,
  StartSeamlessVerificationRequestData,
  StartSmsVerificationRequestData,
} from './requests';
import { SmsOptions } from './start-verification-request';

export const startVerificationHelper = {
  /**
   * Builds a request object for starting an SMS verification process.
   *
   * @param {string} phoneNumber - The phone number to which the verification SMS should be sent.
   * @param {string} [reference] - An optional reference identifier used to pass your own reference in the request for tracking purposes.
   * @param {SmsOptions} [smsOptions] - Optional parameters for configuring the SMS verification request, with default values assumed for all contained values if not provided.
   * @return {StartSmsVerificationRequestData} The constructed SMS verification request data.
   */
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
  /**
   * Builds a request object for starting a phone call verification process.
   *
   * @param {string} phoneNumber - The phone number to which the verification call should be made.
   * @param {string} [reference] - An optional reference identifier used to pass your own reference in the request for tracking purposes.
   * @param {string} [locale] - An optional language-region identifier to use for the verification call.
   * @return {StartPhoneCallVerificationRequestData} The request data object for initiating the phone call verification.
   */
  buildPhoneCallRequest: (
    phoneNumber: string,
    reference?: string,
    locale?: string,
  ): StartPhoneCallVerificationRequestData => {
    return {
      startVerificationWithPhoneCallRequestBody: {
        identity: {
          type: 'number',
          endpoint: phoneNumber,
        },
        reference,
        ...(locale !== undefined) ? {
          phoneCallOptions: {
            speech: {
              locale,
            },
          },
        } : {},
      },
    };
  },
  /**
   * Builds a callout request body with the provided phone number, reference, and locale.
   *
   * @param {string} phoneNumber - The phone number to which the callout will be made.
   * @param {string} [reference] - An optional reference identifier for the callout.
   * @param {string} [locale] - An optional locale string to specify the language or region for the callout.
   * @return {StartCalloutVerificationRequestData} The constructed callout request object.
   * @deprecated */
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
  /**
   * Builds a request object for starting a flash call verification process.
   *
   * @param {string} phoneNumber - The phone number to which the flash call verification should be made.
   * @param {string} [reference] - An optional reference identifier used to pass your own reference in the request for tracking purposes.
   * @param {number} [dialTimeout] - An optional timeout value in seconds for how long to wait for the flash call to be answered.
   * @return {StartFlashCallVerificationRequestData} The request data object for initiating the flash call verification.
   */
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
  /**
   * Builds a request object for initiating a data verification process.
   *
   * @param {string} phoneNumber - The phone number to be verified.
   * @param {string} [reference] - An optional reference identifier used to pass your own reference in the request for tracking purposes.
   * @return {StartDataVerificationRequestData} The request data object used to start the data verification.
   */
  buildDataRequest: (
    phoneNumber: string,
    reference?: string,
  ): StartDataVerificationRequestData => {
    return {
      startDataVerificationRequestBody: {
        identity: {
          type: 'number',
          endpoint: phoneNumber,
        },
        reference,
      },
    };
  },
  /**
   * Builds a seamless verification request body with the provided phone number and optional reference.
   *
   * @param {string} phoneNumber - The phone number to verify.
   * @param {string} [reference] - An optional reference identifier for the verification request.
   * @return {StartSeamlessVerificationRequestData} The constructed seamless verification request data.
   * @deprecated
   */
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
