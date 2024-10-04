export interface ListInboundMessagesRequestData {
  /** The page number starting from 0. */
  'page'?: number;
  /** Determines the size of a page */
  'page_size'?: number;
  /** Only list messages sent to this destination. Multiple phone numbers formatted as either <a href=\"https://community.sinch.com/t5/Glossary/E-164/ta-p/7537\" target=\"_blank\">E.164</a> or short codes can be comma separated. */
  'to'?: string | string[];
  /** Only list messages received at or after this date/time. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601): `YYYY-MM-DDThh:mm:ss.SSSZ`.  Default: Now-24 */
  'start_date'?: Date;
  /** Only list messages received before this date/time. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601): `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  'end_date'?: Date;
  /** Using a client reference in inbound messages requires additional setup on your account. Contact your [account manager](https://dashboard.sinch.com/settings/account-details) to enable this feature.  Only list inbound messages that are in response to messages with a previously provided client reference. */
  'client_reference'?: string;
}
export interface GetInboundMessageRequestData {
  /** The inbound ID found when listing inbound messages. */
  'inbound_id': string;
}
