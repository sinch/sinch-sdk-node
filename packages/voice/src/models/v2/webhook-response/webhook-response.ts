import { SvamlCommand } from '../svaml-commands';

/**
 * Commands to execute on specific events for this call.
 *
 * **Note:** This property only takes effect in responses to webhooks triggered by an incoming call. In responses to other webhook types, it is ignored.
 */
export interface WebhookResponseEvents {
  /** SVAML commands to be executed when the call is hung up. */
  onHangup?: SvamlCommand[];
}

/**
 * Response body returned to the Voice platform from a webhook endpoint.
 *
 * Contains the ordered list of SVAML commands to execute next. `callName` and `events` only take effect in responses to `call.incoming`.
 */
export interface WebhookResponse {
  /** The ordered list of SVAML commands to execute. An empty array takes no action. */
  commands: SvamlCommand[];
  /**
   * Name of the call.
   *
   * **Note:** This property only takes effect in responses to webhooks triggered by an incoming call. In responses to other webhook types, it is ignored.
   */
  callName?: string;
  /** @see WebhookResponseEvents */
  events?: WebhookResponseEvents;
}
