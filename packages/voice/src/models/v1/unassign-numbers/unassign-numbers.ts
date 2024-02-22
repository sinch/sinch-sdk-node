export interface UnassignNumbers {

  /** The phone number in E.164 format (https://en.wikipedia.org/wiki/E.164) */
  number?: string;
  /** Indicates the application where the number(s) was assigned. If empty, the application key that is used to sign the request will be used. */
  applicationkey?: string;
  /** (optional) indicates the DID capability that was assigned to the chosen application. Please note that the DID needs to support the selected capability. */
  capability?: 'voice' | 'sms';
}
