import {
  ReportCalloutVerificationByIdentityRequestData,
  ReportCalloutVerificationByIdRequestData,
  ReportFlashCallVerificationByIdentityRequestData,
  ReportFlashCallVerificationByIdRequestData,
  ReportPhoneCallVerificationByIdentityRequestData,
  ReportPhoneCallVerificationByIdRequestData,
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
   * @deprecated Use the method buildPhoneCallRequest() instead
   */
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
   * @deprecated Use the method buildDataRequest() instead
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
  /**
   * Builds a request object for reporting an SMS verification by its ID.
   *
   * @param {string} id - The unique identifier for the SMS verification request.
   * @param {string} code - The verification code received via SMS.
   * @param {string} [cli] - An optional CLI (Caller Line Identification) that can be included in the request.
   * @return {ReportSmsVerificationByIdRequestData} The request data object used to report the SMS verification.
   */
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
  /**
   * Builds a request object for reporting a phone call verification by its ID.
   *
   * @param {string} id - The unique identifier for the phone call verification request.
   * @param {string} code - The verification code received during the phone call.
   * @return {ReportPhoneCallVerificationByIdRequestData} The request data object used to report the phone call verification.
   */
  buildPhoneCallRequest: (
    id: string,
    code: string,
  ): ReportPhoneCallVerificationByIdRequestData => {
    return {
      id,
      reportPhoneCallVerificationByIdRequestBody: {
        phoneCall: {
          code,
        },
      },
    };
  },
  /**
   * Builds a request object for reporting a callout verification by its ID.
   *
   * @param {string} id - The unique identifier for the callout verification request.
   * @param {string} code - The verification code received during the callout.
   * @return {ReportCalloutVerificationByIdRequestData} The request data object used to report the callout verification.
   * @deprecated Use the method buildPhoneCallRequest() instead
   */
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
  /**
   * Builds a request object for reporting a flash call verification by its ID.
   *
   * @param {string} id - The unique identifier for the flash call verification request.
   * @param {string} cli - The CLI (Caller Line Identification) received during the flash call.
   * @return {ReportFlashCallVerificationByIdRequestData} The request data object used to report the flash call verification.
   */
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
  /**
   * Builds a request object for reporting an SMS verification by the phone number identity.
   *
   * @param {string} identity - The phone number for which the verification process has been initiated.
   * @param {string} code - The verification code received via SMS.
   * @param {string} [cli] - The CLI (Caller Line Identification) that may be used during the verification.
   * @return {ReportSmsVerificationByIdentityRequestData} The request data object used to report the SMS verification.
   */
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
  /**
   * Builds a request object for reporting a phone call verification by the phone number identity.
   *
   * @param {string} identity - The phone number for which the verification process has been initiated.
   * @param {string} code - The verification code received via the phone call.
   * @return {ReportPhoneCallVerificationByIdentityRequestData} The request data object used to report the phone call verification.
   */
  buildPhoneCallRequest: (
    identity: string,
    code: string,
  ): ReportPhoneCallVerificationByIdentityRequestData => {
    return {
      endpoint: identity,
      reportPhoneCallVerificationByIdentityRequestBody: {
        phoneCall: {
          code,
        },
      },
    };
  },
  /**
   * Builds a request object for reporting a callout verification by the phone number identity.
   *
   * @param {string} identity - The phone number for which the callout verification process has been initiated.
   * @param {string} code - The verification code received during the callout.
   * @return {ReportCalloutVerificationByIdentityRequestData} The request data object used to report the callout verification.
   * @deprecated Use the method buildPhoneCallRequest() instead
   */
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
  /**
   * Builds a request object for reporting a flash call verification by the phone number identity.
   *
   * @param {string} identity - The phone number for which the flash call verification process has been initiated.
   * @param {string} cli - The CLI (Caller Line Identification) received during the flash call.
   * @return {ReportFlashCallVerificationByIdentityRequestData} The request data object used to report the flash call verification.
   */
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
