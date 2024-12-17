import { BadRequest, BadRequestFromApi } from './bad-request';

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformBadRequestIntoClientResponse = (
  apiResponse: BadRequestFromApi,
): BadRequest => {
  const {
    ...response
  } = apiResponse;
  return response;
};
