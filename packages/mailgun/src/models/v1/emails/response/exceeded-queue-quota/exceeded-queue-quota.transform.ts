import { ExceededQueueQuota, ExceededQueueQuotaFromApi } from './exceeded-queue-quota';
import {
  transformQueueStatusDisabledDetailsIntoClientResponse,
} from '../queue-status-disabled-details/queue-status-disabled-details.transform';

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformExceededQueueQuota = (
  apiResponse: ExceededQueueQuotaFromApi,
): ExceededQueueQuota => {
  return {
    disabled: transformQueueStatusDisabledDetailsIntoClientResponse(apiResponse['disabled']),
    isDisabled: apiResponse['is_disabled'],
  };
};
