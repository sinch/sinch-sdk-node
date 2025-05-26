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
  /** The valid E.164 phone number that will be dialed on inbound calls when no SIP endpoints are available. Required if `enableCallForward` property is `true`. */
  callForwardNumber?: string;
  /** When enabled, if an inbound call can not be delivered to a SIP endpoint, calls will be forwarded to the configured `callForwardNumber`. To forward all calls without trying SIP, simply disable (or delete) all SIP endpoints on this trunk. Logs (and billing) will be created for 2 calls (inbound and outbound).
   * **Note:** Since there is no SIP connection, PCAPs will not be generated. */
  enableCallForward?: boolean;
  /** The date and time that the SIP trunk was created. */
  createTime?: Date;
  /** The date and time that the SIP trunk was last modified. */
  updateTime?: Date | null;
  /** The ID of the account. */
  projectId?: string;
}
