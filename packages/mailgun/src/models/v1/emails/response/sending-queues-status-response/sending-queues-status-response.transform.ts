import { SendingQueuesStatusResponse, SendingQueuesStatusResponseFromApi } from './sending-queues-status-response';
import { transformExceededQueueQuota } from '../exceeded-queue-quota/exceeded-queue-quota.transform';

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformSendingQueuesStatusResponseIntoClientResponse = (
  apiResponse: SendingQueuesStatusResponseFromApi,
): SendingQueuesStatusResponse => {
  return {
    scheduled: transformExceededQueueQuota(apiResponse['scheduled']),
    regular: transformExceededQueueQuota(apiResponse['regular']),
  };
};
