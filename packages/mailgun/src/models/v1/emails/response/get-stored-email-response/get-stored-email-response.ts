import { EmailHeaders } from '../email-headers';
import { EmailHeadersFromApi } from '../email-headers/email-headers';

export interface GetStoredEmailResponse {
  /** The full \'From\' email address entry of the email */
  from: string;
  /** Subject of the email */
  subject: string;
  /** Just the email address from the provided \'From\'\' field */
  sender: string;
  /** A list of email addresses from the \'To\'\' field */
  recipients: string;
  /** The full HTML body of the full message */
  bodyHtml?: string;
  /** The plain text body of the full message */
  bodyPlain: string;
  /** Only the body of the email in HTML */
  strippedHtml: string;
  /** Only the body of the email in plain text */
  strippedText: string;
  /** The signature stripped from the body */
  strippedSignature: string;
  /** The full list of headers of the MIME upon send */
  messageHeaders: EmailHeaders;
}

export interface GetStoredEmailResponseFromApi {
  /** The full \'From\' email address entry of the email */
  From: string;
  /** Subject of the email */
  Subject: string;
  /** Just the email address from the provided \'From\'\' field */
  sender: string;
  /** A list of email addresses from the \'To\'\' field */
  recipients: string;
  /** The full HTML body of the full message */
  'body-html'?: string;
  /** The plain text body of the full message */
  'body-plain': string;
  /** Only the body of the email in HTML */
  'stripped-html': string;
  /** Only the body of the email in plain text */
  'stripped-text': string;
  /** The signature stripped from the body */
  'stripped-signature': string;
  /** The full list of headers of the MIME upon send */
  'message-headers': EmailHeadersFromApi;
}
