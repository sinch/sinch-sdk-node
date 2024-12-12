import { ExceededQueueQuota, ExceededQueueQuotaFromApi, transformExceededQueueQuota } from '../exceeded-queue-quota';

export interface SendingQueuesStatusResponse {
  /** @see ExceededQueueQuota */
  scheduled: ExceededQueueQuota;
  /** @see ExceededQueueQuota */
  regular: ExceededQueueQuota;
}

export interface SendingQueuesStatusResponseFromApi {
  /** @see ExceededQueueQuotaFromApi */
  scheduled: ExceededQueueQuotaFromApi;
  /** @see ExceededQueueQuotaFromApi */
  regular: ExceededQueueQuotaFromApi;
}

export const transformSendingQueuesStatusResponseIntoClientResponse = (
  apiResponse: SendingQueuesStatusResponseFromApi,
): SendingQueuesStatusResponse => {
  return {
    scheduled: transformExceededQueueQuota(apiResponse['scheduled']),
    regular: transformExceededQueueQuota(apiResponse['regular']),
  };
};
