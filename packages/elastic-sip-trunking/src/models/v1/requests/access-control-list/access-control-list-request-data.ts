import { AccessControlList } from '../../access-control-list';
import { IpRange } from '../../ip-range';
import { UpdateAccessControlListRequest } from '../../update-access-control-list-request';

export interface AddIpRangeToAccessControlListRequestData {
    /** The ID of the access control list entry. that you want to work with */
    'accessControlListId': string;
    /**  */
    'addIpRangeRequestBody': IpRange;
}
export interface CreateAccessControlListRequestData {
    /** The Access Control List details used to create an Access Control List */
    'createAccessControlListBody': AccessControlList;
}
export interface DeleteAccessControlListRequestData {
    /** The ID of the access control list entry. */
    'id': string;
}
export interface DeleteIpRangeFromAccessControlListRequestData {
    /** The ID of the access control list entry that you want to update. */
    'accessControlListId': string;
    /** The ID of the IP range that you want to update. */
    'ipRangeId': string;
}
export interface ListAccessControlListRequestData {
}
export interface ListIpRangesForAccessControlListRequestData {
    /** The ID of the access control list entry. that you want to work with */
    'accessControlListId': string;
}
export interface UpdateAccessControlListRequestData {
    /** The ID of the access control list entry. */
    'id': string;
    /** The Access Control List details used to update an Access Control List  */
    'updateAccessControlListRequestBody': UpdateAccessControlListRequest;
}
export interface UpdateIpRangeFromAccessControlListRequestData {
    /** The ID of the access control list entry that you want to update. */
    'accessControlListId': string;
    /** The ID of the IP range that you want to update. */
    'ipRangeId': string;
    /** The IP range details used to update the IP range property from an Access Control List */
    'updateIpRangeRequestBody': IpRange;
}
