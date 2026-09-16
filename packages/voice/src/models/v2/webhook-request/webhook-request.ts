import { Call } from '../call';

/**
 * Identifies the type of call event that triggered this webhook notification.
 *
 * Call-related webhook events always start with `call.` followed by the type of event that triggered them.
 * Events triggered by the `webhook` SVAML command are dynamic and follow the pattern `call.webhook.<webhookName>`.
 *
 * - `call.incoming`: Triggered when an inbound call arrives on a service configured with a webhook URL.
 * - `call.answered`: Triggered when an outbound call is answered by the recipient.
 * - `call.busy`: Triggered when the outbound call recipient is busy.
 * - `call.rejected`: Triggered when the outbound call is rejected by the recipient.
 * - `call.timeout`: Triggered when the outbound call was not answered within the dial timeout.
 * - `call.hangup`: Triggered when the call is disconnected.
 * - `call.failed`: Triggered when the call could not be set up.
 * - `call.amd.human`: Triggered when answering machine detection determines that a human answered the call.
 * - `call.amd.machine`: Triggered when answering machine detection determines that a machine answered the call.
 * - `call.amd.beep`: Triggered when answering machine detection detects a voicemail beep.
 * - `call.amd.unknown`: Triggered when answering machine detection cannot determine whether a human, machine, or beep was detected.
 * - `call.message.finished`: Triggered when all messages in a `messages` sequence have finished playing.
 * - `call.recording.finished`: Triggered when a recording is successfully stopped. This event does not guarantee that the recorded file has been delivered to the configured destination yet.
 * - `call.recording.failed`: Triggered when recording could not be started.
 * - `call.menu`: Triggered when a menu completes and input is received from the user or the menu fails.
 */
export type WebhookEvent =
  | 'call.incoming'
  | 'call.answered'
  | 'call.busy'
  | 'call.rejected'
  | 'call.timeout'
  | 'call.hangup'
  | 'call.failed'
  | 'call.amd.human'
  | 'call.amd.machine'
  | 'call.amd.beep'
  | 'call.amd.unknown'
  | 'call.message.finished'
  | 'call.recording.finished'
  | 'call.recording.failed'
  | 'call.menu'
  | string;

/**
 * Information about the menu interaction that triggered the webhook, including the menu name and the input sequence received from the user.
 *
 * This property is also included for webhooks triggered by the `webhook` command within a menu context.
 */
export interface WebhookMenu {
  /** The name of the menu that triggered this webhook event. */
  menuName: string;
  /** The input sequence gathered from the user by the menu. */
  input: string;
}

/**
 * The event payload delivered to the webhook endpoint.
 */
export interface WebhookRequest {
  /** @see WebhookEvent */
  event: WebhookEvent;
  /** The current state of the call at the time the event was triggered. Present for call events; may be omitted for other Voice v2 event families. */
  call?: Call;
  /** @see WebhookMenu */
  menu?: WebhookMenu;
}
