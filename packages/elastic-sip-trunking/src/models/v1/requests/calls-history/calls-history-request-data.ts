import { CallResult, DirectionEnum } from '../../enum';
import { DateFormat } from '@sinch/sdk-client';

export interface FindCallsRequestData {
  /** A phone number that you want to use to filter results. You can pass a partial number to get all calls sent to numbers that start with the number you passed. */
  'from'?: string;
  /** Only include calls made to this number or address. You can pass a partial number to get all calls sent to numbers that start with the number you passed. */
  'to'?: string;
  /** Only include calls made from this trunk. */
  'trunkId'?: string;
  /** Filter calls based on  `createTime`. You make the query more precise, fewer results will be returned. For example, 2021-02-01 will return all calls from the first of February 2021, and 2021-02-01T14:00:00Z will return all calls after 14:00 on the first of February. */
  'createTime'?: string;
  /** Filter calls based on `createTime`. It will filter the calls on a range of dates. */
  'createTimeRange'?: DateRangeFilter;
  /** only include calls by on the callResult(s), example callResult=COMPLETED will return all calls which have completed normally. */
  'callResult'?: CallResult;
  /** only include calls by on the direction(s), example direction=INBOUND,OUTBOUND will return all calls that are inbound or outbound. */
  'direction'?: DirectionEnum;
  /** The page you want to fetch */
  'page'?: string;
  /** The maximum number of items to return per request. The default is 100 and the maximum is 1000. If you need to export larger amounts and pagination is not suitable for you can use the Export function in the dashboard. */
  'pageSize'?: number;
}

/**
 * Filter calls based on `createTime`. If not value is submitted, the default value is the prior week.
 * - `from: '2024-02-15'` will return all calls from February 2024, 15th
 * - `from: '2024-02-01T14:00:00Z'` will return all calls after 14:00:00 on the first of February 2024.
 * - `from: '2024-02-01T14:00:00Z'` + `to: '2024-02-01T15:00:00Z'` will return all calls between 14:00:00 and 15:00:00 (inclusive) on the first of February 2024.
 * - `from: '2024-02-01'` + `to: '2024-02-29'` will return all calls for all of February 2024.
 *
 * Note: It is also possible to submit partial dates.
 * - `from: '2024-02'` will return all calls for February 2024
 */
export interface DateRangeFilter {
  /** */
  from?: string | Date | DateFormat;
  /** */
  to?: string | Date | DateFormat;
}
