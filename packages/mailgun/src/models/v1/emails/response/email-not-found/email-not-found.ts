export type EmailNotFound = Omit<EmailNotFoundFromApi, never>;

export interface EmailNotFoundFromApi {
  message: string;
}
