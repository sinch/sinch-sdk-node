import { ServiceRequest } from '../../service';
import { SuspendNumberRequest } from '../../suspend-number-request';

export interface CreateServiceRequestData {
  /**  */
  'createServiceRequestBody'?: ServiceRequest;
}
export interface GetServiceRequestData {
  /** The service ID you want to update. */
  'serviceId': string;
}
export interface ListEmailsForNumberRequestData {
  /** The phone number you want to get emails for. */
  'phoneNumber': string;
  /** The serviceId containing the numbers you want to list. */
  'serviceId': string;
  /** Number of items to return on each page. */
  'pageSize'?: number;
  /** Optional. The page to fetch. If not specified, the first page will be returned. */
  'page'?: string;
}
export interface ListNumbersForServiceRequestData {
  /** The serviceId containing the numbers you want to list. */
  'serviceId': string;
  /** Number of items to return on each page. */
  'pageSize'?: number;
  /** Optional. The page to fetch. If not specified, the first page will be returned. */
  'page'?: string;
}
export interface ListServicesRequestData {
  /** Number of services to return on each request. */
  'pageSize'?: number;
  /** Optional. The page to fetch. If not specified, the first page will be returned. */
  'page'?: string;
}
export interface DeleteServiceRequestData {
  /** The serviceId you want to remove from your project. */
  'serviceId': string;
}
export interface SuspendNumberRequestData {
  /** The serviceId containing the number you want to suspend. */
  'serviceId': string;
  /** The phone number you want to suspend, in E.164 format. */
  'phoneNumber': string;
  /**  */
  'suspendNumberRequestBody'?: SuspendNumberRequest;
}
export interface UpdateServiceRequestData {
  /** The service ID you want to update. */
  'serviceId': string;
  /**  */
  'updateServiceRequestBody'?: ServiceRequest;
}
