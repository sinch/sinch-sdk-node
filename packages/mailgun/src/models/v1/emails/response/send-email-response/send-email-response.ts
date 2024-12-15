export type SendEmailResponse = Omit<SendEmailResponseFromApi, never>

export interface SendEmailResponseFromApi {
  message: string;
  id: string;
}
