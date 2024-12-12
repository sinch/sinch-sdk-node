import {
  QueueStatusDisabledDetails,
  QueueStatusDisabledDetailsFromApi,
  transformQueueStatusDisabledDetailsIntoClientResponse,
} from '../queue-status-disabled-details';

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

export const transformExceededQueueQuota = (
  apiResponse: ExceededQueueQuotaFromApi,
): ExceededQueueQuota => {
  return {
    disabled: transformQueueStatusDisabledDetailsIntoClientResponse(apiResponse['disabled']),
    isDisabled: apiResponse['is_disabled'],
  };
};
