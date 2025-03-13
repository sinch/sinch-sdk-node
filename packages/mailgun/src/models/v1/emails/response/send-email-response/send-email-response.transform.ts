import { SendEmailResponse } from './send-email-response';
import { SendEmailResponseFromApi } from './send-email-response';

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformSendEmailResponseIntoClientResponse = (
  apiResponse: SendEmailResponseFromApi,
): SendEmailResponse => {
  const response: SendEmailResponse = {
    id: apiResponse['id'],
    message: apiResponse['message'],
  };
  return response;
};
