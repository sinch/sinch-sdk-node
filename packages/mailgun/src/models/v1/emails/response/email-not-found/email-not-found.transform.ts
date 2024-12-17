import { EmailNotFound, EmailNotFoundFromApi } from './email-not-found';

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformEmailNotFoundIntoClientResponse = (
  apiResponse: EmailNotFoundFromApi,
): EmailNotFound => {
  const {
    ...response
  } = apiResponse;
  return response;
};
