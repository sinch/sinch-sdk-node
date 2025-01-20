import { EmailHeaders } from '../email-headers';
import { EmailHeadersFromApi } from '../email-headers/email-headers';

export interface GetStoredEmailResponse {
  sender: string;
  recipients: string;
  from: string;
  subject: string;
  bodyHtml?: string;
  bodyPlain: string;
  strippedHtml: string;
  strippedText: string;
  strippedSignature: string;
  messageHeaders: EmailHeaders;
}

export interface GetStoredEmailResponseFromApi {
  sender: string;
  recipients: string;
  from: string;
  subject: string;
  'body-html'?: string;
  'body-plain': string;
  'stripped-html': string;
  'stripped-text': string;
  'stripped-signature': string;
  /** List of EmailHeadersFromApi */
  'message-headers': EmailHeadersFromApi;
  [key: string]: any;
}
