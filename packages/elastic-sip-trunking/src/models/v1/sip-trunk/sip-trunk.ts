
/**
 * A created SIP trunk.
 */
export interface SipTrunk {

  /** The SIP trunk id. */
  id?: string;
  /** The host of the domain you would like to have for you trunk. */
  hostName: string;
  /** The top level domain to which the SIP trunk belongs. */
  topLevelDomain?: string;
  /** The fully qualified name of the domain, which is a combination of your \'hostName\' and the \'topLevelDomain\'. */
  domain?: string;
  /** The friendly name of your SIP trunk. */
  name: string;
  /** Number of calls started per second, to increase this please contact your account manager. */
  callsPerSecond?: number;
  /** Enable caller name lookup for incoming calls. US and canada only. */
  enableCallerName?: boolean;
  /** The date and time that the SIP trunk was created. */
  createTime?: Date;
  /** The date and time that the SIP trunk was last modified. */
  updateTime?: Date;
  /** The ID of the account. */
  projectId?: string;
}
