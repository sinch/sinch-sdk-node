import { EmailRequest } from '../../email';
import { UpdateEmailRequest } from '../../update-email-request';

export interface AddEmailToNumbersRequestData {
  /**  */
  'emailRequestBody': EmailRequest;
}
export interface DeleteEmailRequestData {
  /** The email you want to delete. */
  'email': string;
}
export interface ListEmailsForProjectRequestData {
  /** Number of items to return on each page. */
  'pageSize'?: number;
  /** Optional. The page to fetch. If not specified, the first page will be returned. */
  'page'?: string;
}
export interface ListNumbersByEmailRequestData {
  /** The email you want to get numbers for. */
  'email': string;
  /** Number of items to return on each page. */
  'pageSize'?: number;
  /** Optional. The page to fetch. If not specified, the first page will be returned. */
  'page'?: string;
}
export interface UpdateEmailRequestData {
  /** The email you want to work with. */
  'email': string;
  /**  */
  'updateEmailRequestBody'?: UpdateEmailRequest;
}
