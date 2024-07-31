import { IpRange } from '../ip-range';

export interface CreateAccessControlListRequest {
  /** Your name for the access control list entry. */
  name: string;
  /** Whether the access control list entry is enabled. You can use this to disable a list temporarily without deleting it. */
  enabled?: boolean;
  /** An array of all the IP ranges to create. */
  ipRanges: Omit<IpRange, 'accessControlListId' | 'id' | 'createTime' | 'updateTime' | 'projectId'>[];
}
