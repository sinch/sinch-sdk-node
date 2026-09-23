import { SvamlCommand } from '../svaml-commands';

/**
 * Commands to execute on specific events for this call.
 */
export interface SvamlInputEvents {
  /** SVAML commands to be executed when the call is hung up. */
  onHangup?: SvamlCommand[];
}

/**
 * A SVAML v2 (Sinch Voice Application Markup Language) document describing a call flow.
 * Contains the ordered list of commands to execute, an optional call name, and optional event handlers.
 */
export interface SvamlInput {
  /** The ordered list of SVAML commands to execute. Contains at least one command. */
  commands: SvamlCommand[];
  /** Name of the call. */
  callName?: string;
  /** Commands to execute on specific events for this call. */
  events?: SvamlInputEvents;
}
