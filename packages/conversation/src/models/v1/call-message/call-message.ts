/**
 * Message for triggering a call.
 */
export interface CallMessage {

  /** Phone number in E.164 with leading +. */
  phone_number: string;
  /** Title shown close to the phone number. The title is clickable in some cases. */
  title: string;
}
