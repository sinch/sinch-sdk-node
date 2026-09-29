import { SvamlCommand } from '../svaml-commands';
import { WebhookResponse } from '../webhook-response';

/**
 * Parameters for a response to a `call.incoming` webhook.
 *
 * `name` is written to `callName`.
 * `onHangup` is written to `events.onHangup`.
 */
export interface IncomingCallResponseParameters {
  /** Ordered SVAML commands to execute for the incoming call. */
  commands: SvamlCommand[];
  /** Name of the call. Maps to `callName`. */
  name?: string;
  /** SVAML commands executed when the call is hung up. */
  onHangup?: SvamlCommand[];
}

/**
 * Parameters for a webhook response other than `call.incoming`.
 */
export interface ResponseParameters {
  /** Ordered SVAML commands to execute. An empty array takes no action. */
  commands: SvamlCommand[];
}

/**
 * Dedicated Sinch Events helper for Voice v2 webhook responses.
 *
 * `incomingCallResponse` builds a {@link WebhookResponse} from `commands`, an optional call `name`,
 * and optional `onHangup` commands. `response` builds a {@link WebhookResponse} from `commands` only.
 */
export const responseCreatorHelper = {
  /**
   * Response to a webhook triggered by an incoming call.
   * `callName` and `events` take effect only for `call.incoming`.
   */
  incomingCallResponse: (parameters: IncomingCallResponseParameters): WebhookResponse => {
    const response: WebhookResponse = {
      commands: parameters.commands,
    };
    if (parameters.name !== undefined) {
      response.callName = parameters.name;
    }
    if (parameters.onHangup !== undefined) {
      response.events = {
        onHangup: parameters.onHangup,
      };
    }
    return response;
  },
  /**
   * Response to a webhook other than `call.incoming`.
   * Only `commands` are returned; `callName` and `events` are ignored by the Voice platform.
   */
  response: (parameters: ResponseParameters): WebhookResponse => {
    return {
      commands: parameters.commands,
    };
  },
};
