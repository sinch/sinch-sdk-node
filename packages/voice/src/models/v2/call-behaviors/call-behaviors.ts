import { SvamlInput } from '../svaml-input';
import { WebhookConfiguration } from '../webhook-configuration';

/**
 * No call behavior is configured for the service. Incoming calls will not be handled and outbound
 * calls can still be initiated via the API.
 */
export interface CallBehaviorsNone {
  /** No call behavior is configured. */
  type: 'NONE';
}

/**
 * Calls are handled dynamically by sending webhook events to the configured URL. The backend
 * responds with SVAML commands that control the call flow in real time.
 */
export interface CallBehaviorsWebhook {
  /** Calls are handled by sending webhook requests to the configured URL. */
  type: 'WEBHOOK';
  /** @see WebhookConfiguration */
  webhook: WebhookConfiguration;
}

/**
 * Calls are handled using a predefined static SVAML script. The commands are executed for every
 * call on this service, without any backend involvement.
 */
export interface CallBehaviorsStatic {
  /** Calls are handled using predefined static SVAML commands. */
  type: 'STATIC';
  /** @see SvamlInput */
  static: SvamlInput;
}

/**
 * Defines how calls are handled for this service.
 */
export type CallBehaviors = CallBehaviorsNone | CallBehaviorsWebhook | CallBehaviorsStatic;
