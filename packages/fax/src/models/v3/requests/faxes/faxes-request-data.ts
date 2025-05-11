import { FaxDirection, FaxStatus } from '../../enums';
import { SingleFaxRequest, MultipleFaxRequest } from '../../fax-request';
import { DateRangeFilter } from '../../date-range-filter';

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
  /** Limits results to faxes that were sent using the specified service. */
  'serviceId'?: string;
  /** Filter calls based on `createTime`. It can be a year, a month or a day. */
  'createTime'?: string | Date;
  /** Filter calls based on `createTime`. It will filter the faxes on a range of dates. */
  'createTimeRange'?: DateRangeFilter;
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

export type SendFaxRequestData = SendSingleFaxRequestData | SendMultipleFaxRequestData;

export interface SendSingleFaxRequestData {
  'sendFaxRequestBody': SingleFaxRequest;
}

export interface SendMultipleFaxRequestData {
  'sendFaxRequestBody': MultipleFaxRequest;
}
