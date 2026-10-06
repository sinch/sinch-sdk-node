import { CallBehaviorsNone, CallBehaviorsStatic, CallBehaviorsWebhook } from '../call-behaviors';
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
 * Parameters for a WEBHOOK service call behavior.
 */
export interface WebhookCallBehaviorParameters {
  /** Webhook URL that receives call events. */
  url: string;
  /** Fallback webhook URL used when the primary URL fails. */
  fallbackUrl?: string;
}

/**
 * Dedicated services helper for Voice v2 call behaviors.
 *
 * `static` builds a {@link CallBehaviorsStatic} from `commands`, an optional call `name`,
 * and optional `onHangup` commands. `none` configures no call behavior. `webhook` sends
 * call events to a URL.
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
  /**
   * No call behavior is configured. Incoming calls are not handled.
   */
  none: (): CallBehaviorsNone => {
    return {
      type: 'NONE',
    };
  },
  /**
   * Calls are handled by sending webhook events to `url`.
   */
  webhook: (parameters: WebhookCallBehaviorParameters): CallBehaviorsWebhook => {
    const behavior: CallBehaviorsWebhook = {
      type: 'WEBHOOK',
      webhook: {
        url: parameters.url,
      },
    };
    if (parameters.fallbackUrl !== undefined) {
      behavior.webhook.fallbackUrl = parameters.fallbackUrl;
    }
    return behavior;
  },
};
