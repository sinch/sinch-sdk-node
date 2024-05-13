export interface ReplaceGroupRequest {

  /** Name of group. */
  name?: string;
  /** The initial members of the group.  Constraints: Elements must be phone numbers in <a href=\"https://community.sinch.com/t5/Glossary/E-164/ta-p/7537\" target=\"_blank\">E.164</a> format MSISDNs. */
  members: string[];
}


