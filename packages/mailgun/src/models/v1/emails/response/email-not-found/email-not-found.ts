export type EmailNotFound = Omit<EmailNotFoundFromApi, never>;

export interface EmailNotFoundFromApi {
  message: string;
}

export const transformEmailNotFoundIntoClientResponse = (
  apiResponse: EmailNotFoundFromApi,
): EmailNotFound => {
  const {
    ...response
  } = apiResponse;
  return response;
};
