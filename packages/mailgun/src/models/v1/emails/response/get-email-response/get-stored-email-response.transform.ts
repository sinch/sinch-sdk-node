import {
  GetStoredEmailResponse,
  GetStoredEmailResponseFromApi,
  MessageHeaders,
  MessageHeadersFromApi,
} from './get-stored-email-response';

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformGetEmailResponseIntoClientResponse = (
  apiResponse: GetStoredEmailResponseFromApi,
): GetStoredEmailResponse => {
  return {
    sender: apiResponse['sender'],
    recipients: apiResponse['recipients'],
    from: apiResponse['from'],
    subject: apiResponse['subject'],
    bodyHtml: apiResponse['body-html'],
    bodyPlain: apiResponse['body-plain'],
    messageHeaders: convertHeaders(apiResponse['message-headers']),
    strippedHtml: apiResponse['stripped-html'],
    strippedText: apiResponse['stripped-text'],
    strippedSignature: apiResponse['stripped-signature'],
  };
};

const convertHeaders = (headers: MessageHeadersFromApi): MessageHeaders => {
  return headers.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as MessageHeaders);
};
