import { SendingQueuesStatusResponse } from './sending-queues-status-response';
import { SendingQueuesStatusResponseFromApi } from './sending-queues-status-response';
import { transformExceededQueueQuotaIntoClientResponse } from '../exceeded-queue-quota/exceeded-queue-quota.transform';

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformSendingQueuesStatusResponseIntoClientResponse = (
  apiResponse: SendingQueuesStatusResponseFromApi,
): SendingQueuesStatusResponse => {
  const response: SendingQueuesStatusResponse = {
    regular: transformExceededQueueQuotaIntoClientResponse(apiResponse['regular']),
    scheduled: transformExceededQueueQuotaIntoClientResponse(apiResponse['scheduled']),
  };
  return response;
};
