import {
  SvamlAction,
  SvamlActionContinue,
  SvamlActionHangup,
  SvamlActionPark,
  SvamlInstruction,
} from '../mod-svaml';

export type ManagedCallSvamlAction = SvamlActionHangup
  | SvamlActionContinue
  | SvamlActionPark;

/**
 * SVAML is a call control markup language. When a server receives a callback event from the Sinch platform, it can respond with a SVAML object to control the voice call. The following is an example of a SVAML object type and its contents.
 */
export interface ManagedCallSvamlRequestBody {

  /** The collection of instructions that can perform various tasks during the call. You can include as many instructions as necessary. */
  instructions?: SvamlInstruction[];
  /** The action that will control the call. Each SVAML object can only include one action. */
  action?: ManagedCallSvamlAction;
}

/**
 * SVAML is a call control markup language. When a server receives a callback event from the Sinch platform, it can respond with a SVAML object to control the voice call. The following is an example of a SVAML object type and its contents.
 * @deprecated SVAML is context-specific. Use {@link ManagedCallSvamlRequestBody} for
 * `updateCall` / `manageCallWithCallLeg`, or {@link AceResponse}, {@link IceResponse},
 * or {@link PieResponse} for callback responses.
 */
export interface SVAMLRequestBody {

  /** The collection of instructions that can perform various tasks during the call. You can include as many instructions as necessary. */
  instructions?: SvamlInstruction[];
  /** @see SvamlAction */
  action?: SvamlAction;
}
