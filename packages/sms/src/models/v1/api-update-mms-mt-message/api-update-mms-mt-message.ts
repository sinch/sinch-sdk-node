/**
 * Model: ApiUpdateMmsMtMessage
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { MediaBody } from '../media-body';
import { ParameterObj } from '../parameter-obj';
import { DeliveryReportEnum } from '../enums';

export interface ApiUpdateMmsMtMessage {

  /** Sender number. Must be valid phone number, short code or alphanumeric. */
  from?: string;
  /** MMS */
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
  /** @see MediaBody */
  body?: MediaBody;
  /** @see ParameterObj */
  parameters?: ParameterObj;
  /** Whether or not you want the media included in your message to be checked against [Sinch MMS channel best practices](/docs/mms/bestpractices/). If set to true, your message will be rejected if it doesn\'t conform to the listed recommendations, otherwise no validation will be performed.  */
  strict_validation?: boolean;
}

export type TypeEnum = 'mt_media';

