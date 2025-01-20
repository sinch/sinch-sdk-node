import { GetStoredEmailResponse, GetStoredEmailResponseFromApi } from './get-stored-email-response';
import { transformEmailHeadersIntoClientResponse } from '../email-headers/email-headers.transform';

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformGetStoredEmailResponseIntoClientResponse = (
  apiResponse: GetStoredEmailResponseFromApi,
): GetStoredEmailResponse => {
  const response = {
    sender: apiResponse['sender'],
    recipients: apiResponse['recipients'],
    from: apiResponse['from'],
    subject: apiResponse['subject'],
    bodyHtml: apiResponse['body-html'],
    bodyPlain: apiResponse['body-plain'],
    strippedHtml: apiResponse['stripped-html'],
    strippedText: apiResponse['stripped-text'],
    strippedSignature: apiResponse['stripped-signature'],
    messageHeaders: transformEmailHeadersIntoClientResponse(apiResponse['message-headers']),
  };
  return response;
};
