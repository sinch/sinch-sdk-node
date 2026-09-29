import { CallBehaviorsStatic } from '../call-behaviors';
import { SvamlCommand } from '../svaml-commands';
import { SvamlInput } from '../svaml-input';

/**
 * Parameters for a STATIC service call behavior.
 *
 * `name` is written to `callName` on the SVAML document.
 * `onHangup` is written to `events.onHangup`.
 */
export interface StaticCallBehaviorParameters {
  /** Ordered SVAML commands executed for every call on this service. */
  commands: SvamlCommand[];
  /** Name of the call. Maps to `callName`. */
  name?: string;
  /** SVAML commands executed when the call is hung up. */
  onHangup?: SvamlCommand[];
}

/**
 * Dedicated services helper for Voice v2 call behaviors.
 *
 * `static` builds a {@link CallBehaviorsStatic} from `commands`, an optional call `name`,
 * and optional `onHangup` commands.
 */
export const callBehaviorHelper = {
  /**
   * Calls are handled using predefined static SVAML commands, without a backend webhook.
   */
  static: (parameters: StaticCallBehaviorParameters): CallBehaviorsStatic => {
    const svaml: SvamlInput = {
      commands: parameters.commands,
    };
    if (parameters.name !== undefined) {
      svaml.callName = parameters.name;
    }
    if (parameters.onHangup !== undefined) {
      svaml.events = {
        onHangup: parameters.onHangup,
      };
    }
    return {
      type: 'STATIC',
      static: svaml,
    };
  },
};
