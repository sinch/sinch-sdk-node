export const transformGenericResponseIntoClientResponse = (
  apiResponse: GenericResponseFromApi,
): GenericResponse => {
  const {
    ...response
  } = apiResponse;
  return response;
};

export type GenericResponse = Omit<GenericResponseFromApi, never>

export interface GenericResponseFromApi {
  message: string;
}