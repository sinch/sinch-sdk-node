/**
 * An object containing information about the participant (caller or callee) of the call.
 */
export interface Participant {

  /** The type of the participant (caller or callee). */
  type?: 'number' | 'Number' | 'username' | 'Username' | 'sip' | 'did' | string;
  /** The phone number, user name, or other identifier of the participant (caller or callee). */
  endpoint?: string;
}


