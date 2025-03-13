export interface GetStoredEmailResponse {
  sender: string,
  recipients: string,
  from: string,
  subject: string
  bodyHtml?: string,
  bodyPlain: string,
  messageHeaders: MessageHeaders;
  strippedHtml: string,
  strippedText: string,
  strippedSignature: string,
}

export interface GetStoredEmailResponseFromApi {
  sender: string;
  recipients: string;
  from: string;
  subject: string;
  'body-html'?: string;
  'body-plain': string;
  'message-headers': MessageHeadersFromApi;
  'stripped-html': string;
  'stripped-text': string;
  'stripped-signature': string;
  [key: string]: any;
}

export type MessageHeadersFromApi = [string, string | Date][];

export type MessageHeaders = {
  [key: string]: string | Date;
};
