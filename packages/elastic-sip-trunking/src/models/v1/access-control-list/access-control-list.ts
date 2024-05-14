import { IpRange } from '../ip-range';

export interface AccessControlList {
  /** The ID of the access control list entry. */
  id?: string;
  /** Your name for the access control list entry. */
  name: string;
  /** Whether the access control list entry is enabled. You can use this to disable an list temporarily without deleting it. */
  enabled?: boolean;
  /** The associated IP ranges. When creating you need to submit at least one IP range. */
  ipRanges: IpRange[];
  /** The associated SIP trunks ID. */
  trunks?: string[];
  /** The time the access control list was created. */
  createTime?: Date;
  /** The time the access control list was created. */
  updateTime?: Date | null;
  /** The ID of the project. */
  projectId?: string;
}
