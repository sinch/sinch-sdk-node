import { SvamlAction, SvamlInstruction } from '../mod-svaml';

/**
 * SVAML is a call control markup language. When a server receives a callback event from the Sinch platform, it can respond with a SVAML object to control the voice call. The following is an example of a SVAML object type and its contents.
 */
export interface SVAMLRequestBody {

  /** The collection of instructions that can perform various tasks during the call. You can include as many instructions as necessary. */
  instructions?: SvamlInstruction[];
  /** @see SvamlAction */
  action?: SvamlAction;
}
