export const transformGetEmailResponseIntoClientResponse = (apiResponse: GetEmailResponseFromApi): GetEmailResponse => {
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

function convertHeaders(headers: MessageHeadersFromApi): MessageHeaders {
  return headers.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as MessageHeaders);
}

export interface GetEmailResponse {
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

export interface GetEmailResponseFromApi {
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
}

export type MessageHeadersFromApi = [string, string][];

export type MessageHeaders= {
  [key: string]: string;
};
