import { EmailHeaders, EmailHeadersFromApi } from './email-headers';

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformEmailHeadersIntoClientResponse = (apiResponse: EmailHeadersFromApi): EmailHeaders => {
  const emailHeaders: EmailHeaders = {};
  for (const [key, value] of apiResponse) {
    emailHeaders[key] = value;
  }
  return emailHeaders;
};
