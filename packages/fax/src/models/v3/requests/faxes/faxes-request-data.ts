import { FaxDirection, FaxStatus } from '../../enums';
import { FaxRequest } from '../../fax-request';

export interface DeleteFaxContentRequestData {
  /** The ID of the fax. */
  'id': string;
}
export interface DownloadFaxContentRequestData {
  /** The ID of the fax. */
  'id': string;
  /** The file format to download. Currently only PDF is supported. */
  'fileFormat'?: 'pdf';
}
export interface GetFaxRequestData {
  /** The ID of the fax. */
  'id': string;
}
export interface ListFaxesRequestData {
  /** Filter calls based on  `createTime`. If you make the query more precise, fewer results will be returned. For example, `2021-02-01` will return all calls from the first of February 2021, and `2021-02-01T14:00:00Z` will return all calls after 14:00 on the first of February. This field also supports `<=` and `>=` to search for calls in a range `?createTime>=2021-10-01&startTime<=2021-10-30` to get a list of calls for all of October 2021. It is also possible to submit partial dates. For example, `createTime=2021-02` will return all calls for February 2021.  If not value is submitted, the default value is the prior week. */
  'createTime'?: string;
  /** Limits results to faxes with the specified direction. */
  'direction'?: FaxDirection;
  /** Limits results to faxes with the specified status. */
  'status'?: FaxStatus;
  /** A phone number that you want to use to filter results. The parameter search with startsWith, so you can pass a partial number to get all faxes sent to numbers that start with the number you passed. */
  'to'?: string;
  /** A phone number that you want to use to filter results.  The parameter search with startsWith, so you can pass a partial number to get all faxes sent to numbers that start with the number you passed. */
  'from'?: string;
  /** The maximum number of items to return per request. The default is 100 and the maximum is 1000. If you need to export larger amounts and pagination is not suitable for you can use the Export function in the dashboard. */
  'pageSize'?: number;
  /** The page you want to retrieve returned from a previous List request, if any */
  'page'?: string;
}
export interface SendFaxRequestData {
  'sendFaxRequestBody': FaxRequest;
}
