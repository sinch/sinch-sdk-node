import { AddAccessControlListToTrunk } from '../../add-access-control-list-to-trunk';
import { SipTrunk } from '../../sip-trunk';

export interface AddAccessControlListToTrunkRequestData {
    /** The ID of the trunk that you want to work with */
    'trunkId': string;
    /** The body containing the list of ACLs to add to the SIP trunk */
    'addAccessControlListToTrunkRequestBody': AddAccessControlListToTrunk;
}
export interface CreateSipTrunkRequestData {
    /** The SIP trunk details to be used to create a SIP trunk */
    'createSipTrunkRequestBody': SipTrunk;
}
export interface DeleteAccessControlListFromTrunkRequestData {
    /** The ID of the trunk that you want to work with */
    'trunkId': string;
    /** The ID of the access control list entry. that you want to remove from trunk */
    'accessControlListId': string;
}
export interface DeleteSipTrunkRequestData {
    /** The ID of the SIP trunk. */
    'sipTrunkId': string;
}
export interface ListAccessControlListsForTrunkRequestData {
    /** The ID of the trunk that you want to work with */
    'trunkId': string;
}
export interface GetSipTrunkRequestData {
    /** The ID of the SIP trunk. */
    'sipTrunkId': string;
}
export interface ListSipTrunksRequestData {
    /** The page you want to fetch, can set to 1 for first page, or omitted for first page */
    'page'?: number;
    /** The size of each page to fetch */
    'pageSize'?: number;
    /** Filter by domain */
    'domain'?: string;
}
export interface UpdateSipTrunkRequestData {
    /** The ID of the SIP trunk. */
    'sipTrunkId': string;
    /** The SIP trunk details to be used to update the SIP trunk */
    'updateSipTrunkRequestBody': SipTrunk;
}
