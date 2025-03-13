export interface GetStoredEmailResponse {
  /** Just the email address from the provided 'From' field */
  sender: string;
  /** A list of email addresses from the 'To' field */
  recipients: string;
  /** The full 'From' email address entry of the email */
  from: string;
  /** Subject of the email */
  subject: string;
  /** The full HTML body of the full message */
  bodyHtml?: string;
  /** The plain text body of the full message */
  bodyPlain: string;
  /** The full list of headers of the MIME upon send */
  messageHeaders: MessageHeaders;
  /** Only the body of the email in HTML */
  strippedHtml: string;
  /** Only the body of the email in plain text */
  strippedText: string;
  /** The signature stripped from the body */
  strippedSignature: string;
}

export interface GetStoredEmailResponseFromApi {
  /** Just the email address from the provided 'From' field */
  sender: string;
  /** A list of email addresses from the 'To' field */
  recipients: string;
  /** The full 'From' email address entry of the email */
  From: string;
  /** Subject of the email */
  Subject: string;
  /** The full HTML body of the full message */
  'body-html'?: string;
  /** The plain text body of the full message */
  'body-plain': string;
  /** The full list of headers of the MIME upon send */
  'message-headers': MessageHeadersFromApi;
  /** Only the body of the email in HTML */
  'stripped-html': string;
  /** Only the body of the email in plain text */
  'stripped-text': string;
  /** The signature stripped from the body */
  'stripped-signature': string;
  [key: string]: any;
}

export type MessageHeadersFromApi = [string, string | Date][];

export type MessageHeaders = {
  [key: string]: string | Date;
};
