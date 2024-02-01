import { ConversationChannel } from '../conversation-channel';
import { ProcessingMode } from '../processing-mode';
import { ConversationEvent } from '../conversation-event';

/**
 * This callback is used to deliver opt-in notifications from the channels.
 */
export interface OptInEvent extends ConversationEvent {

  /** Id of the subscribed app. */
  app_id?: string;
  /** Timestamp marking when the channel callback was accepted/received by the Conversation API. */
  accepted_time?: Date;
  /** Timestamp of the event as provided by the underlying channels. */
  event_time?: Date;
  /** The project ID of the app which has subscribed for the callback. */
  project_id?: string;
  /** Context-dependent metadata. Refer to specific callback\'s documentation for exact information provided. */
  message_metadata?: string;
  /** The value provided in field correlation_id of a send message request. */
  correlation_id?: string;
  /** @see OptInNotification */
  opt_in_notification?: OptInNotification;
  /** Name of the trigger responsible for this event. */
  trigger: 'OPT_IN';
}

export interface OptInNotification {

  /** ID generated when making an opt-in registration request. Can be used to detect duplicates. */
  request_id?: string;
  /** The ID of the contact which is the subject of the opt-in. Will be empty if processing_mode is DISPATCH. */
  contact_id?: string;
  /** @see ConversationChannel */
  channel?: ConversationChannel;
  /** The channel identity. For example, a phone number for SMS, WhatsApp and Viber Business. */
  identity?: string;
  /** Status of the opt-in registration. */
  status?: StatusEnum;
  /** @see OptInNotificationErrorDetails */
  error_details?:OptInNotificationErrorDetails;
  /** @see ProcessingMode */
  processing_mode?: ProcessingMode;
}
export type StatusEnum = 'OPT_IN_SUCCEEDED' | 'OPT_IN_FAILED' | 'OPT_IN_STATUS_UNSPECIFIED';

/**
 * This field is populated if the opt-in failed.
 */
export interface OptInNotificationErrorDetails {

  /** Human-readable error description. */
  description?: string;
}
