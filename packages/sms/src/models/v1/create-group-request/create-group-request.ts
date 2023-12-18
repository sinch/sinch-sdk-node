/**
 * Model: CreateGroupRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { GroupObjectAutoUpdate } from '../group-object-auto-update';

export interface CreateGroupRequest {

  /** Name of the group */
  name?: string;
  /** \"Initial list of phone numbers in <a href=\"https://community.sinch.com/t5/Glossary/E-164/ta-p/7537\" target=\"_blank\">E.164</a> format <a href=\"https://community.sinch.com/t5/Glossary/MSISDN/ta-p/7628\" target=\"_blank\">MSISDNs</a> for the group.\" */
  members?: string[];
  /** Phone numbers (<a href=\"https://community.sinch.com/t5/Glossary/MSISDN/ta-p/7628\" target=\"_blank\">MSISDNs</a>) of child group will be included in this group. If present then this group will be auto populated.  Constraints: Elements must be group IDs. */
  child_groups?: string[];
  /** @see GroupObjectAutoUpdate */
  auto_update?: GroupObjectAutoUpdate;
}


