import { ExceededQueueQuota } from '../exceeded-queue-quota';
import { ExceededQueueQuotaFromApi, transformExceededQueueQuota } from '../exceeded-queue-quota/exceeded-queue-quota';

export const transformSendingQueuesStatusResponseIntoClientResponse = (
  apiResponse: SendingQueuesStatusResponseFromApi,
): SendingQueuesStatusResponse => {
  return {
    scheduled: transformExceededQueueQuota(apiResponse.scheduled),
    regular: transformExceededQueueQuota(apiResponse.regular),
  };
};

export interface SendingQueuesStatusResponse {
  /** @see ExceededQueueQuota */
  scheduled: ExceededQueueQuota;
  /** @see ExceededQueueQuota */
  regular: ExceededQueueQuota;
}

export interface SendingQueuesStatusResponseFromApi {
  /** @see ExceededQueueQuota */
  scheduled: ExceededQueueQuotaFromApi;
  /** @see ExceededQueueQuota */
  regular: ExceededQueueQuotaFromApi;
}
