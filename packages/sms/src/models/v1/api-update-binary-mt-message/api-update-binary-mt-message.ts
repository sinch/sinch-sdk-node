/**
 * Model: ApiUpdateBinaryMtMessage
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */
import { DeliveryReportEnum } from '../enums';


export interface ApiUpdateBinaryMtMessage {

  /** Sender number. Must be valid phone number, short code or alphanumeric. */
  from?: string;
  /** SMS in binary format */
  type?: TypeEnum;
  /** List of phone numbers and group IDs to add to the batch. */
  to_add?: string[];
  /** List of phone numbers and group IDs to remove from the batch. */
  to_remove?: string[];
  /** Request delivery report callback.     Note that delivery reports can be fetched from the API regardless of this setting.  */
  delivery_report?: DeliveryReportEnum;
  /** If set, in the future the message will be delayed until `send_at` occurs. Formatted as <a href=\"https://en.wikipedia.org/wiki/ISO_8601\" target=\"_blank\">ISO-8601</a>: `YYYY-MM-DDThh:mm:ss.SSSZ`.  Constraints: Must be before expire_at. If set in the past, messages will be sent immediately.  */
  send_at?: Date;
  /** If set, the system will stop trying to deliver the message at this point.  Constraints: Must be after `send_at`  Default: 3 days after `send_at`  */
  expire_at?: Date;
  /** Override the default callback URL for this batch.  Constraints: Must be valid URL.  */
  callback_url?: string;
  /** The message content Base64 encoded.     Max 140 bytes together with udh. */
  body?: string;
  /** The UDH header of a binary message HEX encoded. Max 140 bytes together with body. */
  udh?: string;
}

export type TypeEnum = 'mt_binary';

