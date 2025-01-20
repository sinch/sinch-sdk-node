import { ExceededQueueQuota } from '../exceeded-queue-quota';
import { ExceededQueueQuotaFromApi } from '../exceeded-queue-quota/exceeded-queue-quota';

export interface SendingQueuesStatusResponse {
  regular: ExceededQueueQuota;
  scheduled: ExceededQueueQuota;
}

export interface SendingQueuesStatusResponseFromApi {
  /** @see ExceededQueueQuotaFromApi */
  regular: ExceededQueueQuotaFromApi;
  /** @see ExceededQueueQuotaFromApi */
  scheduled: ExceededQueueQuotaFromApi;
}
