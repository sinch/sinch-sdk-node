import { GroupAutoUpdate } from '../group-auto-update';

export interface CreateGroupRequest {
  /** Name of the group */
  name?: string;
  /** Initial list of phone numbers in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format [MSISDNs](https://community.sinch.com/t5/Glossary/MSISDN/ta-p/7628) for the group. */
  members?: string[];
  /** Phone numbers ([MSISDNs](https://community.sinch.com/t5/Glossary/MSISDN/ta-p/7628)) of child group will be included in this group. If present then this group will be auto populated.  Constraints: Elements must be group IDs. */
  child_groups?: string[];
  /** @see GroupAutoUpdate */
  auto_update?: GroupAutoUpdate;
}
