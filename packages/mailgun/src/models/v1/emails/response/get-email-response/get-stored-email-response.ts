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

export const transformGetEmailResponseIntoClientResponse = (
  apiResponse: GetStoredEmailResponseFromApi,
): GetStoredEmailResponse => {
  return {
    sender: apiResponse['sender'],
    recipients: apiResponse['recipients'],
    from: apiResponse['from'],
    subject: apiResponse['subject'],
    bodyHtml: apiResponse['body-html'],
    bodyPlain: apiResponse['body-plain'],
    messageHeaders: convertHeaders(apiResponse['message-headers']),
    strippedHtml: apiResponse['stripped-html'],
    strippedText: apiResponse['stripped-text'],
    strippedSignature: apiResponse['stripped-signature'],
  };
};

const convertHeaders = (headers: MessageHeadersFromApi): MessageHeaders => {
  return headers.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as MessageHeaders);
};
