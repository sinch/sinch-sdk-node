/**
 * Model: ApiMoMessage
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * The page of inbounds matching the given filters.
 */
export interface ApiMoMessage {

  body?: string;
  /** If this inbound message is in response to a previously sent message that contained a client reference, then this field contains *that* client reference.   Utilizing this feature requires additional setup on your account. Contact your <a href=\"https://dashboard.sinch.com/settings/account-details\" target=\"_blank\">account manager</a> to enable this feature. */
  client_reference?: string;
  /** The phone number that sent the message. <a href=\"https://community.sinch.com/t5/Glossary/MSISDN/ta-p/7628\" target=\"_blank\">More info</a> */
  from: string;
  /** The ID of this inbound message. */
  id: string;
  /** The MCC/MNC of the sender\'s operator if known. */
  operator_id?: string;
  /** When the system received the message.   Formatted as <a href=\"https://en.wikipedia.org/wiki/ISO_8601\" target=\"_blank\">ISO-8601</a>: `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  received_at: Date;
  /** When the message left the originating device. Only available if provided by operator.  Formatted as <a href=\"https://en.wikipedia.org/wiki/ISO_8601\" target=\"_blank\">ISO-8601</a>: `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  sent_at?: Date;
  /** The Sinch phone number or short code to which the message was sent. */
  to: string;
  type: string;
}


