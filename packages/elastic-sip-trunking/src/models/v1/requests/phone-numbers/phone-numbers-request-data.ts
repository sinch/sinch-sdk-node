export interface ListPhoneNumbersRequestData {
    /** The ID of the SIP trunk to search for. */
    'sipTrunkId'?: string;
    /** The page you want to fetch, can set to 1 for first page, or omitted for first page */
    'page'?: number;
    /** The size of each page to fetch */
    'size'?: number;
}

export interface GetPhoneNumberRequestData {
    /** The phone number you want to search for. Must be in E.164 format. */
    'phoneNumber': string;
}