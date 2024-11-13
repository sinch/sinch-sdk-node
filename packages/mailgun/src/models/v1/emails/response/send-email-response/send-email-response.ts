export const transformSendEmailResponseIntoClientResponse = (
  apiResponse: SendEmailResponseFromApi,
): SendEmailResponse => {
  const {
    ...response
  } = apiResponse;
  return response;
};

export type SendEmailResponse = Omit<SendEmailResponseFromApi, never>

export interface SendEmailResponseFromApi {
  message: string;
  id: string;
}
