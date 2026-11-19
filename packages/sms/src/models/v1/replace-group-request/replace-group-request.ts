import { GroupAutoUpdate } from '../group-auto-update';

export interface ReplaceGroupRequest {
  /** Name of group. */
  name?: string;
  /** The initial members of the group.  Constraints: Elements must be phone numbers in [E.164](https://support.sinch.com/hc/en-us/articles/52299961578771-E-164) format MSISDNs. */
  members: string[];
  /** Phone numbers ([MSISDNs](https://support.sinch.com/hc/en-us/articles/52299915309075-MSISDN)) of child group will be included in this group. If present then this group will be auto populated.  Constraints: Elements must be group IDs. */
  child_groups?: string[];
  /** @see GroupAutoUpdate */
  auto_update?: GroupAutoUpdate;
}
