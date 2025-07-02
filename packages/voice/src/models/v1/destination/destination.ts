/**
 * Known destination from event (ICE, DICE)
 */
export type Destination = DestinationDid | DestinationMxp | DestinationPstn | DestinationSip;

/**
 * Known callout destination (TTS, Conference, Custom)
 */
export type CalloutDestination = DestinationMxp | DestinationPstn | DestinationSip;

/**
 * An object containing information about the participant (caller or callee) of the call.
 */
export type Participant = Destination;

/**
 * The type of device and phone number called.
 */
export interface DestinationDid {
  /** Type `did` for Direct Inward Dialling */
  type: 'did' | 'Did' | string;
  /** Number that the caller has called */
  endpoint: string;
}

/**
 * The type of device and number or endpoint to call.
 */
export interface DestinationMxp {
  /** Type `userName` used for data endpoints. */
  type: 'username' | 'Username' | string;
  /** For type `userName` the value is the username for a data endpoint. */
  endpoint: string;
}

/**
 * The type of device and number or endpoint to call.
 */
export interface DestinationPstn {
  /** Type `number` used for PSTN endpoints. */
  type: 'number' | 'Number' | string;
  /** If the type is `number` the value of the endpoint is a phone number. */
  endpoint: string;
}

/**
 * The type of device and number or endpoint to call.
 */
export interface DestinationSip {
  /** Type `sip` for SIP infrastructures. */
  type: 'sip' | 'Sip' | string;
  /** For type `sip` the value is the SIP address for a SIP endpoint. */
  endpoint: string;
}

/**
 * Specifies where to route the Stream call.
 */
export interface DestinationStream {
  /** This attribute defines the streaming protocol - currently only Websocket is supported. */
  type: 'websocket' | 'Websocket' | string;
  /** The Stream/Websocket server address. */
  endpoint: string;
}
