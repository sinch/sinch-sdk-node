import { AddAccessControlListToTrunk } from '../../add-access-control-list-to-trunk';
import { SipTrunk } from '../../sip-trunk';
import { CredentialListIds } from '../../credential-list-ids';

export interface AddAccessControlListToTrunkRequestData {
    /** The ID of the trunk that you want to work with */
    'trunkId': string;
    /** The body containing the list of ACLs to add to the SIP trunk */
    'addAccessControlListToTrunkRequestBody': AddAccessControlListToTrunk;
}
export interface AddCredentialListIdsToTrunkRequestData {
    /** The ID of the trunk that you want to work with */
    'trunkId': string;
    /**  */
    'addCredentialListIdsToTrunkRequestBody': CredentialListIds;
}
export interface CreateSipTrunkRequestData {
    /** The SIP trunk details to be used to create a SIP trunk */
    'createSipTrunkRequestBody': Pick<SipTrunk, 'name' | 'hostName' | 'enableCallerName'>;
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
export interface DeleteCredentialListFromTrunkRequestData {
    /** The ID of the trunk. */
    'trunkId': string;
    /** The ID of the credential list entry. */
    'credentialListId': string;
}
export interface ListAccessControlListsForTrunkRequestData {
    /** The ID of the trunk that you want to work with */
    'trunkId': string;
    /** The page you want to fetch, can set to 1 for first page, or omitted for first page */
    'page'?: number;
    /** The size of each page to fetch */
    'size'?: number;
}
export interface GetSipTrunkRequestData {
    /** The ID of the SIP trunk. */
    'sipTrunkId': string;
}
export interface ListSipTrunksRequestData {
    /** The page you want to fetch, can set to 1 for first page, or omitted for first page */
    'page'?: number;
    /** The size of each page to fetch */
    'size'?: number;
    /** Filter by domain */
    'domain'?: string;
}
export interface ListCredentialListsForTrunkRequestData {
    /** The ID of the trunk that you want to work with */
    'trunkId': string;
    /** The page you want to fetch, can set to 1 for first page, or omitted for first page */
    'page'?: number;
    /** The size of each page to fetch */
    'size'?: number;
    /** An array setting the sorting criteria in the format of `property,(ascending/descending)` */
    'sort'?: string[];
}
export interface UpdateSipTrunkRequestData {
    /** The ID of the SIP trunk. */
    'sipTrunkId': string;
    /** The SIP trunk details to be used to update the SIP trunk */
    'updateSipTrunkRequestBody': Partial<Pick<SipTrunk, 'name' | 'hostName' | 'enableCallerName'>>;
}
export interface UpdateCredentialListIdsForTrunkRequestData {
    /** The ID of the trunk that you want to work with */
    'trunkId': string;
    /** List of Credential List Ids */
    'updateCredentialListIdsForTrunkRequestBody'?: CredentialListIds;
}
