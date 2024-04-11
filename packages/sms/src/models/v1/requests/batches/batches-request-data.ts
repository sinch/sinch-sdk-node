import { DeliveryFeedbackRequest } from '../../delivery-feedback-request';
import { DryRunRequest, ReplaceBatchMessageRequest } from '../../dry-run-request';
import { SendSMSRequest } from '../../send-sms-request';
import { TextRequest } from '../../text-request';
import { BinaryRequest } from '../../binary-request';
import { MediaRequest } from '../../media-request';
import { UpdateBatchMessageRequest } from '../../update-batch-message-request';

export interface CancelBatchMessageRequestData {
  /** The batch ID you received from sending a message. */
  'batch_id': string;
}
export interface DeliveryFeedbackRequestData {
  /** The batch ID you received from sending a message. */
  'batch_id': string;
  /** A list of phone numbers (MSISDNs) that successfully received the message. */
  'deliveryFeedbackRequestBody': DeliveryFeedbackRequest;
}
export interface DryRunRequestData {
  /** Whether to include per recipient details in the response */
  'per_recipient'?: boolean;
  /** Max number of recipients to include per recipient details for in the response */
  'number_of_recipients'?: number;
  /**  */
  'dryRunRequestBody'?: DryRunRequest;
}
export interface GetBatchMessageRequestData {
  /** The batch ID you received from sending a message. */
  'batch_id': string;
}
export interface ListBatchesRequestData {
  /** The page number starting from 0. */
  'page'?: number;
  /** Determines the size of a page. */
  'page_size'?: number;
  /** Only list messages sent from this sender number. Multiple originating numbers can be comma separated. Must be phone numbers or short code. */
  'from'?: string;
  /** Only list messages received at or after this date/time. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601): `YYYY-MM-DDThh:mm:ss.SSSZ`.  Default: Now-24 */
  'start_date'?: Date;
  /** Only list messages received before this date/time. Formatted as [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601): `YYYY-MM-DDThh:mm:ss.SSSZ`. */
  'end_date'?: Date;
  /** Client reference to include */
  'client_reference'?: string;
}
export interface ReplaceBatchMessageRequestData {
  /** The batch ID you received from sending a message. */
  'batch_id': string;
  /**  */
  'replaceBatchMessageRequestBody'?: ReplaceBatchMessageRequest;
}
export interface SendSMSRequestData {
  /** Default schema is Text if type is not specified. */
  'sendSMSRequestBody'?: SendSMSRequest;
}
export interface SendTextSMSRequestData {
  /** TextMessage request body */
  'sendSMSRequestBody'?: TextRequest;
}
export interface SendBinarySMSRequestData {
  /** BinaryMessage request body */
  'sendSMSRequestBody'?: BinaryRequest;
}
export interface SendMediaSMSRequestData {
  /** MediaMessage request body */
  'sendSMSRequestBody'?: MediaRequest;
}
export interface UpdateBatchMessageRequestData {
  /** The batch ID you received from sending a message. */
  'batch_id': string;
  /**  */
  'updateBatchMessageRequestBody'?: UpdateBatchMessageRequest;
}
