import { QueueStatusDisabledDetails } from '../queue-status-disabled-details';
import { QueueStatusDisabledDetailsFromApi } from '../queue-status-disabled-details/queue-status-disabled-details';

export interface ExceededQueueQuota {
  /** @see QueueStatusDisabledDetails */
  disabled?: QueueStatusDisabledDetails;
  isDisabled: boolean;
}

export interface ExceededQueueQuotaFromApi {
  /** @see QueueStatusDisabledDetailsFromApi */
  disabled?: QueueStatusDisabledDetailsFromApi;
  is_disabled: boolean;
}
