export const transformGetEmailResponseIntoClientResponse = (apiResponse: GetEmailResponseFromApi): GetEmailResponse => {
  return {
    contentTransferEncoding: apiResponse['Content-Transfer-Encoding'],
    contentType: apiResponse['Content-Type'],
    messageId: apiResponse['Message-Id'],
    mimeVersion: apiResponse['Mime-Version'],
    to: apiResponse['To'],
    deliveryTime: apiResponse['X-Mailgun-Deliver-By'],
    sender: apiResponse['sender'],
    recipients: apiResponse['recipients'],
    from: apiResponse['from'],
    subject: apiResponse['subject'],
    bodyHtml: apiResponse['body-html'],
    bodyPlain: apiResponse['body-plain'],
    strippedHtml: apiResponse['stripped-html'],
    strippedText: apiResponse['stripped-text'],
    strippedSignature: apiResponse['stripped-signature'],
  };
};

export interface GetEmailResponse {
  contentTransferEncoding?: string,
  contentType: string,
  messageId: string,
  mimeVersion: string,
  to: string,
  deliveryTime: Date,
  sender: string,
  recipients: string,
  from: string,
  subject: string
  bodyHtml?: string,
  bodyPlain: string,
  strippedHtml: string,
  strippedText: string,
  strippedSignature: string,
}

export interface GetEmailResponseFromApi {
  'Content-Transfer-Encoding'?: string;
  'Content-Type': string;
  From: string;
  'Message-Id': string;
  'Mime-Version': string;
  Subject: string;
  To: string;
  'X-Mailgun-Deliver-By': Date;
  sender: string;
  recipients: string;
  from: string;
  subject: string;
  'body-html'?: string;
  'body-plain': string;
  'message-headers': Array<Array<string>>;
  'stripped-html': string;
  'stripped-text': string;
  'stripped-signature': string;
}
