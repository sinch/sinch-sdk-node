import { CallBlockingRuleRequest } from '../../call-blocking-rule';

export interface CreateBlockingRuleRequestData {
    /** The body containing the Call Blocking Rule details to create */
    'createCallBlockingRuleRequestBody': CallBlockingRuleRequest;
}
export interface DeleteBlockingRuleRequestData {
    /** The ID of the call blocking rule to delete. */
    'id': string;
}
export interface ListBlockingRulesRequestData {
    /** The page you want to fetch, can set to 1 for first page, or omitted for first page */
    'page'?: number;
    /** The size of each page to fetch */
    'size'?: number;
    /** An array setting the sorting criteria in the format of `property,(ascending/descending)` */
    'sort'?: Array<string>;
}
export interface UpdateBlockingRuleRequestData {
    /** The ID of the call blocking rule to update. */
    'id': string;
    /** The body containing the Call Blocking Rule details to update */
    'updateCallBlockingRuleRequestBody': CallBlockingRuleRequest;
}
