export interface AssignNumbers {

  /** The phone number or list of numbers in E.164 format. */
  numbers?: string[];
  /** indicates the application where the number(s) will be assigned. If empty, the application key that is used to sign the request will be used. */
  applicationkey?: string;
  /** indicates the DID capability that needs to be assigned to the chosen application. Valid values are 'voice' and 'sms'. Please note that the DID needs to support the selected capability. */
  capability?: 'voice' | 'sms';
}
