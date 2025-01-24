import { QueueStatusDisabledDetails } from './queue-status-disabled-details';
import { QueueStatusDisabledDetailsFromApi } from './queue-status-disabled-details';

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformQueueStatusDisabledDetailsIntoClientResponse = (
  apiResponse: QueueStatusDisabledDetailsFromApi,
): QueueStatusDisabledDetails => {
  const response: QueueStatusDisabledDetails = {
    until: apiResponse['until'],
    reason: apiResponse['reason'],
  };
  return response;
};
