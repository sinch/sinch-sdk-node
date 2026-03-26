/**
 * A SIP endpoint which is the address of your SIP infrastructure. It can either be an IP address or a domain name.
 */
export type SipEndpoint = StaticEndpoint | RegisteredEndpoint;

export interface SipEndpointBase {
  /** The ID of the SIP endpoint. */
  id?: string;
  /** The ID of the SIP trunk to which the endpoint is assigned. */
  sipTrunkId?: string;
  /** The friendly name of the SIP endpoint. */
  name: string;
  /** The transport protocol of the SIP endpoint. */
  transport?: 'TCP' | 'UDP' | 'TLS' | string;
  /** Inbound call routing priority. If two or more endpoints have the same priority, calls will be routed to them using a round-robin strategy. */
  priority: number;
  /** Sets whether the SIP endpoint is enabled or not. */
  enabled?: boolean;
  /** The date and time that the SIP endpoint was created. */
  createTime?: Date;
  /** The date and time that the SIP endpoint was last modified. */
  updateTime?: Date | null;
  /** The ID of the project. */
  projectId?: string;
}

export interface StaticEndpoint extends SipEndpointBase {
  /** The address of the SIP endpoint can be an IP address or a domain name. EST uses IP authentication and will only accept calls from the specified address or domain. */
  address: string;
  /** The port of the SIP endpoint. */
  port?: number;
}

export interface RegisteredEndpoint extends SipEndpointBase {
  /** This property determines whether the endpoint is static or registered. If registered, this must be set to `true`. */
  isRegistered: boolean;
  /** @deprecated The username for the credential list you want to use to register the endpoint. */
  credentialUserName?: string;
  /** @deprecated The username for the credential list you want to use to register the endpoint. */
  credentialUsername: string;
}
