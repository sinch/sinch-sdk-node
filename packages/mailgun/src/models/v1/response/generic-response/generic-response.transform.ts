import { GenericResponse, GenericResponseFromApi } from './generic-response';

export const transformGenericResponseIntoClientResponse = (apiResponse: GenericResponseFromApi): GenericResponse => {
  return {
    message: apiResponse['message'],
  };
};
