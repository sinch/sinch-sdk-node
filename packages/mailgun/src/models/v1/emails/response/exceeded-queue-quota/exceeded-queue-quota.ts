import { QueueStatusDisabledDetails } from '../queue-status-disabled-details';
import { QueueStatusDisabledDetailsFromApi } from '../queue-status-disabled-details/queue-status-disabled-details';

export interface ExceededQueueQuota {
  isDisabled: boolean;
  /** @see QueueStatusDisabledDetails */
  details?: QueueStatusDisabledDetails;
}

export interface ExceededQueueQuotaFromApi {
  is_disabled: boolean;
  /** @see QueueStatusDisabledDetailsFromApi */
  disabled?: QueueStatusDisabledDetailsFromApi;
}
