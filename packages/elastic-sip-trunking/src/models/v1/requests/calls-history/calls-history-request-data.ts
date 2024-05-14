import { CallResult, DirectionEnum } from '../../enum';

export interface FindCallsRequestData {
  /** A phone number that you want to use to filter results. You can pass a partial number to get all calls sent to numbers that start with the number you passed. */
  'from'?: string;
  /** Only include calls made to this number or address. You can pass a partial number to get all calls sent to numbers that start with the number you passed. */
  'to'?: string;
  /** Only include calls made from this trunk. */
  'trunkId'?: string;
  /** Filter calls based on  `createTime`. You make the query more precise, fewer results will be returned. For example, 2021-02-01 will return all calls from the first of February 2021, and 2021-02-01T14:00:00Z will return all calls after 14:00 on the first of February. This field also supports <= and >= to search for calls in a range ?createTime>=2021-10-01&createTime<=2021-10-30 to get a list if calls for october 2021 It is also possible to submit partial dates for example createTime=2021-02 will return all calls for February  ***Defaults to 24 hours***  ***Internal notes*** If a customer submits = and not <> we should add min and max for the date range psueodo sql  ``` createTime = 2021-02-01 select * from calls where createTime >= 2021-02-01 and createTime <= 2021-02-01T23:59:59Z  createTime = 2021-02-01T08 select * from calls where createTime >= 2021-02-01T08:00:00 and createTime <= 2021-02-01T08:59:59Z ```  but if they submit < or > we should just use the value they submitted and parse it a complete date */
  'createTime'?: string;
  /** only include calls by on the callResult(s), example callResult=COMPLETED will return all calls which have completed normally. */
  'callResult'?: CallResult;
  /** only include calls by on the direction(s), example direction=INBOUND,OUTBOUND will return all calls that are inbound or outbound. */
  'direction'?: DirectionEnum;
  /** The page you want to fetch */
  'page'?: string;
  /** The maximum number of items to return per request. The default is 100 and the maximum is 1000. If you need to export larger amounts and pagination is not suitable for you can use the Export function in the dashboard. */
  'pageSize'?: number;
}
