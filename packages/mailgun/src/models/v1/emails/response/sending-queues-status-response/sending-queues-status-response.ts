import { ExceededQueueQuota } from '../exceeded-queue-quota';
import { ExceededQueueQuotaFromApi } from '../exceeded-queue-quota/exceeded-queue-quota';

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
