import { ConsentsListType } from '../../enums';

export interface ListIdentitiesRequestData {
    /** The unique ID of the app. You can find this on the [Sinch Dashboard](https://dashboard.sinch.com/convapi/apps). */
    app_id: string;
    /** The consent list type. One of `OPT_OUT_ALL`, `OPT_OUT_MARKETING`, and or `OPT_OUT_NOTIFICATION`. */
    list_type: ConsentsListType;
    /** Optional. The maximum number of records to fetch. The default is 10 and the maximum is 50. */
    page_size?: number;
    /** A page token, received from a previous Get identities from consent list call. Provide this to retrieve a subsequent page. */
    page_token?: string;
}

export interface ListAuditRecordsRequestData {
    /** The unique ID of the app. You can find this on the [Sinch Dashboard](https://dashboard.sinch.com/convapi/apps). */
    app_id: string;
    /** An identity to use on Consent audit records queries. */
    identity: string;
}
