import { GenericResponse, GenericResponseFromApi } from './generic-response';

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const transformGenericResponseIntoClientResponse = (
  apiResponse: GenericResponseFromApi,
): GenericResponse => {
  const {
    ...response
  } = apiResponse;
  return response;
};
