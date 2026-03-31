import { CreateCredentialListRequest } from '../../create-credential-list-request';
import { CredentialPassword } from '../../credential-password';
import { UpdateCredentialListRequest } from '../../update-credential-list-request';

export interface CreateCredentialListRequestData {
    /** The body containing the Credential List details to create */
    'createCredentialListRequestBody': CreateCredentialListRequest;
}
export interface DeleteCredentialListRequestData {
    /** The ID of the credential list to delete. */
    'id': string;
}
export interface DeleteCredentialRequestData {
    /** The ID of the credential list entry. */
    'id': string;
    /** The username of the credential. */
    'username': string;
}
export interface GetCredentialListRequestData {
    /** The ID of the credential list to return. */
    'id': string;
}
export interface ListCredentialListsRequestData {
    /** The page you want to fetch, can set to 1 for first page, or omitted for first page */
    'page'?: number;
    /** The size of each page to fetch */
    'size'?: number;
}
export interface ListTrunksForCredentialListRequestData {
    /** The ID of the credential list entry. */
    'id': string;
    /** The page you want to fetch, can set to 1 for first page, or omitted for first page */
    'page'?: number;
    /** The size of each page to fetch */
    'size'?: number;
}
export interface UpdateCredentialRequestData {
    /** The ID of the credential list entry. */
    'id': string;
    /** The username of the credential. */
    'username': string;
    /** The body containing the Credential details to update */
    'updateCredentialPasswordRequestBody': CredentialPassword;
}
export interface UpdateCredentialListRequestData {
    /** The ID of the credential list to update. */
    'id': string;
    /** The body containing the Credential List details to update */
    'updateCredentialListRequestBody': UpdateCredentialListRequest;
}
