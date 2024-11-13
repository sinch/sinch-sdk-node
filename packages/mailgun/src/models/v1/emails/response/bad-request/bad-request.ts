export const transformBadRequestIntoClientResponse = (
  apiResponse: BadRequestFromApi,
): BadRequest => {
  const {
    ...response
  } = apiResponse;
  return response;
};

export type BadRequest = Omit<BadRequestFromApi, never>;
export interface BadRequestFromApi {
  message: string;
}
