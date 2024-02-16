/**
 * Call Headers can be used to pass custom data from a Sinch SDK client to another, or specified in an ICE response to be made available to the receiving client. Further, if Call Headers is specified they will be available in ICE and DICE events.
 */
export interface CallHeader {

  /** The call header key of the key value pair. */
  key?: string;
  /** The call header value of the key value pair. */
  value?: string;
}
