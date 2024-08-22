import { UpdateGroupRequestAutoUpdate } from '../update-group-request-auto-update';

export interface UpdateGroupRequest {

  /** The name of the group. Omitting `name` from the JSON body will leave the name unchanged. To remove an existing name set, name explicitly to the JSON value `null`. */
  name?: string | null;
  /** Add a list of phone numbers (MSISDNs) to this group. The phone numbers are a strings within an array and must be in <a href=\"https://community.sinch.com/t5/Glossary/E-164/ta-p/7537\" target=\"_blank\">E.164 format</a>. */
  add?: string[];
  /** Remove a list of phone numbers (MSISDNs) to this group.The phone numbers are a strings within an array and must be in <a href=\"https://community.sinch.com/t5/Glossary/E-164/ta-p/7537\" target=\"_blank\">E.164 format</a>. */
  remove?: string[];
  /** Copy the members from the another group into this group.  Constraints: Must be valid group ID */
  add_from_group?: string;
  /** Remove the members in a specified group from this group.  Constraints: Must be valid group ID */
  remove_from_group?: string;
  /** @see UpdateGroupRequestAutoUpdate */
  auto_update?: UpdateGroupRequestAutoUpdate;
}


