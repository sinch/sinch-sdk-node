export interface SmsVerificationReportRequest {
  /** A configuration object containing settings specific to SMS verifications. */
  sms: SmsContent;
}

interface SmsContent {
  /** The code which was received by the user submitting the SMS verification. */
  code: string;
  /** @deprecated The sender ID of the SMS. */
  cli?: string;
}

export interface FlashCallVerificationReportRequest {
  /** A configuration object containing settings specific to FlashCall verifications. */
  flashCall: FlashCallContent;
}

interface FlashCallContent {
  /** The caller ID of the flash call. Caller ID in flash call verification refers to the phone number from which the call was made to the user's device. The verification system uses this incoming number as One Time Password (OTP) */
  cli: string;
}

export interface PhoneCallVerificationReportRequest {
  /** A configuration object containing settings specific to Phone Call verifications */
  phoneCall: PhoneCallContent;
}

export interface PhoneCallVerificationReportRequestServerModel {
  /** A configuration object containing settings specific to Phone Call verifications */
  callout: PhoneCallContent;
}

/** @deprecated Use PhoneCallVerificationReportRequest instead */
export interface CalloutVerificationReportRequest {
  /** A configuration object containing settings specific to Phone Call verifications */
  callout: CalloutContent;
}

interface PhoneCallContent {
  /** The code which was received by the user submitting the Phone Call verification. */
  code?: string;
}

/** @deprecated Use PhoneCallContent instead */
type CalloutContent = PhoneCallContent;
