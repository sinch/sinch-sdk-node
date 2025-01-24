import { GetStoredEmailResponse } from './get-stored-email-response';
import { GetStoredEmailResponseFromApi } from './get-stored-email-response';
import { transformEmailHeadersIntoClientResponse } from '../email-headers/email-headers.transform';

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformGetStoredEmailResponseIntoClientResponse = (
  apiResponse: GetStoredEmailResponseFromApi,
): GetStoredEmailResponse => {
  const response: GetStoredEmailResponse = {
    sender: apiResponse['sender'],
    recipients: apiResponse['recipients'],
    from: apiResponse['from'],
    subject: apiResponse['subject'],
    bodyPlain: apiResponse['body-plain'],
    strippedHtml: apiResponse['stripped-html'],
    strippedText: apiResponse['stripped-text'],
    strippedSignature: apiResponse['stripped-signature'],
    messageHeaders: transformEmailHeadersIntoClientResponse(apiResponse['message-headers']),
  };
  if (apiResponse['body-html'] != null) {
    response.bodyHtml = apiResponse['body-html'];
  }
  return response;
};
