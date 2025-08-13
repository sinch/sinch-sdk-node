import { EmailRequest } from '../../email';
import { UpdateEmailRequest } from '../../update-email-request';

export interface AddEmailToNumbersRequestData {
  /** The serviceId to which you want to add the email. */
  'serviceId': string;
  /**  */
  'emailRequestBody': EmailRequest;
}
export interface DeleteEmailRequestData {
  /** The serviceId containing the email you want to work with. */
  'serviceId': string;
  /** The email you want to delete. */
  'email': string;
}
export interface ListEmailsForProjectRequestData {
  /** The serviceId containing the emails you want to list. */
  'serviceId': string;
  /** Number of items to return on each page. */
  'pageSize'?: number;
  /** Optional. The page to fetch. If not specified, the first page will be returned. */
  'page'?: string;
}
export interface ListNumbersByEmailRequestData {
  /** The serviceId containing the email you want to work with. */
  'serviceId': string;
  /** The email you want to get numbers for. */
  'email': string;
  /** Number of items to return on each page. */
  'pageSize'?: number;
  /** Optional. The page to fetch. If not specified, the first page will be returned. */
  'page'?: string;
}
export interface UpdateEmailRequestData {
  /** The serviceId containing the email you want to work with. */
  'serviceId': string;
  /** The email you want to work with. */
  'email': string;
  /**  */
  'updateEmailRequestBody'?: UpdateEmailRequest;
}
