import { SipEndpoint } from '../../sip-endpoint';

export interface CreateSipEndpointRequestData {
    /** The ID of the SIP trunk. */
    'sipTrunkId': string;
    /** The body containing the SIP Endpoint to create for the SIP trunk */
    'createSipEndpointRequestBody': SipEndpoint;
}
export interface DeleteSipEndpointRequestData {
    /** The ID of the SIP trunk. */
    'sipTrunkId': string;
    /** The ID of the SIP endpoint. */
    'sipEndpointId': string;
}
export interface ListSipEndpointsRequestData {
    /** The ID of the SIP trunk. */
    'sipTrunkId': string;
    /** The page you want to fetch, can set to 1 for first page, or omitted for first page */
    'page'?: number;
    /** The size of each page to fetch */
    'pageSize'?: number;
}
export interface GetSipEndpointByIdRequestData {
    /** The ID of the SIP trunk. */
    'sipTrunkId': string;
    /** The ID of the SIP endpoint. */
    'sipEndpointId': string;
}
export interface UpdateSipEndpointRequestData {
    /** The ID of the SIP trunk. */
    'sipTrunkId': string;
    /** The ID of the SIP endpoint. */
    'sipEndpointId': string;
    /** The body containing the SIP Endpoint details to update */
    'updateSipEndpointRequestBody': SipEndpoint;
}
