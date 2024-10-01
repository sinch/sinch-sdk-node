import {
  CalloutVerificationReportRequest,
  FlashCallVerificationReportRequest,
  PhoneCallVerificationReportRequest,
  SmsVerificationReportRequest,
} from '../../verification-report-request';
import {
  StartDataVerification,
  StartSeamlessVerification,
  StartVerificationWithCallout,
  StartVerificationWithFlashCall,
  StartVerificationWithPhoneCall,
  StartVerificationWithSms,
} from '../../start-verification-request';

interface ReportVerificationByIdRequestDataBase {
  /** The ID of the verification. */
  'id': string;
}

export interface ReportSmsVerificationByIdRequestData extends ReportVerificationByIdRequestDataBase {
  /** Request body to report a verification started with an SMS by its ID */
  'reportSmsVerificationByIdRequestBody': SmsVerificationReportRequest;
}

export interface ReportFlashCallVerificationByIdRequestData extends ReportVerificationByIdRequestDataBase {
  /** Request body to report a verification started with a flashCall by its ID */
  'reportFlashCallVerificationByIdRequestBody': FlashCallVerificationReportRequest;
}

export interface ReportPhoneCallVerificationByIdRequestData extends ReportVerificationByIdRequestDataBase {
  /** Request body to report a verification started with a phone call by its ID */
  'reportPhoneCallVerificationByIdRequestBody': PhoneCallVerificationReportRequest;
}

/** @deprecated Use ReportPhoneCallVerificationByIdRequestData instead */
export interface ReportCalloutVerificationByIdRequestData extends ReportVerificationByIdRequestDataBase {
  /** Request body to report a verification started with a callout by its ID */
  'reportCalloutVerificationByIdRequestBody': CalloutVerificationReportRequest;
}

interface ReportVerificationByIdentityRequestDataBase {
  /** For type `number` use a [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537)-compatible phone number. */
  'endpoint': string;
}

export interface ReportSmsVerificationByIdentityRequestData extends ReportVerificationByIdentityRequestDataBase {
  /** Request body to report a verification started with an SMS by its identity */
  'reportSmsVerificationByIdentityRequestBody': SmsVerificationReportRequest;
}

export interface ReportFlashCallVerificationByIdentityRequestData extends ReportVerificationByIdentityRequestDataBase {
  /** Request body to report a verification started with a flashCall by its identity */
  'reportFlashCallVerificationByIdentityRequestBody': FlashCallVerificationReportRequest;
}

export interface ReportPhoneCallVerificationByIdentityRequestData extends ReportVerificationByIdentityRequestDataBase {
  /** Request body to report a verification started with a callout by its identity */
  'reportPhoneCallVerificationByIdentityRequestBody': PhoneCallVerificationReportRequest;
}

/** @deprecated Use ReportPhoneCallVerificationByIdentityRequestData instead */
export interface ReportCalloutVerificationByIdentityRequestData extends ReportVerificationByIdentityRequestDataBase {
  /** Request body to report a verification started with a callout by its identity */
  'reportCalloutVerificationByIdentityRequestBody': CalloutVerificationReportRequest;
}

export interface StartSmsVerificationRequestData {
  /** Request body to start a verification with an SMS */
  'startVerificationWithSmsRequestBody': StartVerificationWithSms;
}

export interface StartFlashCallVerificationRequestData {
  /** Request body to start a verification with a flashCall */
  'startVerificationWithFlashCallRequestBody': StartVerificationWithFlashCall;
}

export interface StartPhoneCallVerificationRequestData {
  /** Request body to start a verification with a phone call */
  'startVerificationWithPhoneCallRequestBody': StartVerificationWithPhoneCall;
}

/** @deprecated Use StartPhoneCallVerificationRequestData instead */
export interface StartCalloutVerificationRequestData {
  /** Request body to start a verification with a callout */
  'startVerificationWithCalloutRequestBody': StartVerificationWithCallout;
}

export interface StartDataVerificationRequestData {
  /** Request body to start a data verification */
  'startDataVerificationRequestBody': StartDataVerification;
}

/** @deprecated Use StartDataVerificationRequestData instead */
export interface StartSeamlessVerificationRequestData {
  /** Request body to start a seamless verification */
  'startSeamlessVerificationRequestBody': StartSeamlessVerification;
}
