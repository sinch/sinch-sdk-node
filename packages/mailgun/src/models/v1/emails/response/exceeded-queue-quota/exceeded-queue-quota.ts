import { QueueStatusDisabledDetails } from '../queue-status-disabled-details';

export const transformExceededQueueQuota = (
  apiResponse: ExceededQueueQuotaFromApi,
): ExceededQueueQuota => {
  return {
    disabled: apiResponse.disabled,
    isDisabled: apiResponse.is_disabled,
  };
};

export interface ExceededQueueQuota {
  /** @see QueueStatusDisabledDetails */
  disabled?: QueueStatusDisabledDetails;
  isDisabled: boolean;
}

export interface ExceededQueueQuotaFromApi {
  /** @see QueueStatusDisabledDetails */
  disabled?: QueueStatusDisabledDetails;
  is_disabled: boolean;
}
