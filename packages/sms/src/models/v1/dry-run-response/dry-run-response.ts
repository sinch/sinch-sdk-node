import { DryRunResponsePerRecipientInner } from '../dry-run-response-per-recipient-inner';

export interface DryRunResponse {

  /** The number of recipients in the batch */
  number_of_recipients?: number;
  /** The total number of SMS message parts to be sent in the batch */
  number_of_messages?: number;
  /** The recipient, the number of message parts to this recipient, the body of the message, and the encoding type of each message */
  per_recipient?: DryRunResponsePerRecipientInner[];
}


