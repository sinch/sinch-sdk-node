import { RegisteredEndpoint, StaticEndpoint } from '../../sip-endpoint';

export type StaticEndpointRequest = Omit<StaticEndpoint, 'id' | 'sipTrunkId' | 'createTime' | 'updateTime'>;
export type RegisteredEndpointRequest = Omit<RegisteredEndpoint, 'id' | 'sipTrunkId' | 'createTime' | 'updateTime'>;

export interface CreateSipEndpointRequestData {
    /** The ID of the SIP trunk. */
    'sipTrunkId': string;
    /** The body containing the SIP Endpoint to create for the SIP trunk */
    'createSipEndpointRequestBody': StaticEndpointRequest | RegisteredEndpointRequest;
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
    'size'?: number;
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
    'updateSipEndpointRequestBody': StaticEndpointRequest | RegisteredEndpointRequest;
}
