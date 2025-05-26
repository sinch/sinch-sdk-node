/**
 * Known destination
 */
export type Destination = DestinationDid | DestinationMxp | DestinationPstn | DestinationSip;

/**
 * The type of device and phone number called.
 */
export interface DestinationDid {
  /** Type `did` for Direct Inward Dialling */
  type: 'did' | 'Did';
  /** Number that the caller has called */
  endpoint: string;
}

/**
 * The type of device and number or endpoint to call.
 */
export interface DestinationMxp {
  /** Type `userName` used for data endpoints. */
  type: 'username' | 'Username';
  /** For type `userName` the value is the username for a data endpoint. */
  endpoint: string;
}

/**
 * The type of device and number or endpoint to call.
 */
export interface DestinationPstn {
  /** Type `number` used for PSTN endpoints. */
  type: 'number' | 'Number';
  /** If the type is `number` the value of the endpoint is a phone number. */
  endpoint: string;
}

/**
 * The type of device and number or endpoint to call.
 */
export interface DestinationSip {
  /** Type `sip` for SIP infrastructures. */
  type: 'sip' | 'Sip';
  /** For type `sip` the value is the SIP address for a SIP endpoint. */
  endpoint: string;
}
