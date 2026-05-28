export interface ListPhoneNumbersRequestData {
    /** The ID of the SIP trunk to search for. */
    'sipTrunkId'?: string;
    /** The page you want to fetch, can set to 1 for first page, or omitted for first page */
    'page'?: number;
    /** The size of each page to fetch */
    'size'?: number;
    /** An array setting the sorting criteria in the format of `property,(ascending/descending)` */
    'sort'?: Array<string>;
}

export interface GetPhoneNumberRequestData {
    /** The phone number in E.164 format with leading `+`. */
    'phoneNumber': string;
}