/**
 * If you are including the SMS channel in the `channel_identifier` property, you must include this object or a 'static_bearer' object.
 */
export interface SMSCredentials {

  /** Indicates particular Sms App Id inside SMPP Service */
  sms_app_id: string;
}
