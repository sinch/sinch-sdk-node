export interface GetPhoneNumberRequestData {
    /** The phone number you want to search for. Must be in E.164 format. */
    'phoneNumber': string;
}
export interface ListPhoneNumbersRequestData {
    /** A query string to filter the results by. */
    'filter'?: string;
    /** The ID of the SIP trunk to search for. */
    'sipTrunkIdQuery'?: string;
    /** The page you want to fetch, can set to 1 for first page, or omitted for first page */
    'page'?: number;
    /** The size of each page to fetch */
    'pageSize'?: number;
    /** An array setting the sorting criteria in the format of `property,(ascending/descending)` */
    'sort'?: Array<string>;
}
