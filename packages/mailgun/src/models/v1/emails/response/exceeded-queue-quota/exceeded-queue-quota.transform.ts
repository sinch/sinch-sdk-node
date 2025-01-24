import { ExceededQueueQuota } from './exceeded-queue-quota';
import { ExceededQueueQuotaFromApi } from './exceeded-queue-quota';
import { transformQueueStatusDisabledDetailsIntoClientResponse } from '../queue-status-disabled-details/queue-status-disabled-details.transform';

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformExceededQueueQuotaIntoClientResponse = (
  apiResponse: ExceededQueueQuotaFromApi,
): ExceededQueueQuota => {
  const response: ExceededQueueQuota = {
    isDisabled: apiResponse['is_disabled'],
  };
  if (apiResponse['disabled'] != null) {
    response.details = transformQueueStatusDisabledDetailsIntoClientResponse(apiResponse['disabled']);
  }
  return response;
};
