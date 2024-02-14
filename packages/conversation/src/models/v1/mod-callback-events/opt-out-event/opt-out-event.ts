import { ConversationChannel } from '../../conversation-channel';
import { ConversationEvent } from '../conversation-event';
import { ProcessingMode } from '../../enums';

/**
 * This callback is used to deliver opt-out notifications from the channels.
 */
export interface OptOutEvent extends ConversationEvent {

  /** Id of the subscribed app. */
  app_id?: string;
  /** Timestamp marking when the channel callback was accepted/received by the Conversation API. */
  accepted_time?: Date;
  /** Timestamp of the event as provided by the underlying channels. */
  event_time?: Date;
  /** The project ID of the app which has subscribed for the callback. */
  project_id?: string;
  /** Context-dependent metadata. Refer to specific callback's documentation for exact information provided. */
  message_metadata?: string;
  /** The value provided in field correlation_id of a send message request. */
  correlation_id?: string;
  /** @see OptOutNotification */
  opt_out_notification?: OptOutNotification;
  /** Name of the trigger responsible for this event. */
  trigger: 'OPT_OUT';
}

export interface OptOutNotification {

  /** ID generated when making an opt-out registration request. Can be used to detect duplicates. */
  request_id?: string;
  /** The ID of the contact which is the subject of the opt-out. Will be empty if processing_mode is DISPATCH. */
  contact_id?: string;
  /** @see ConversationChannel */
  channel?: ConversationChannel;
  /** The channel identity. For example, a phone number for SMS, WhatsApp and Viber Business. */
  identity?: string;
  /** Status of the opt-out registration. */
  status?: 'OPT_OUT_SUCCEEDED' | 'OPT_OUT_FAILED' | 'OPT_OUT_STATUS_UNSPECIFIED';
  /** @see OptOutNotificationErrorDetails */
  error_details?: OptOutNotificationErrorDetails;
  /** @see ProcessingMode */
  processing_mode?: ProcessingMode;
}

/**
 * This field is populated if the opt-out failed.
 */
export interface OptOutNotificationErrorDetails {

  /** Human-readable error description. */
  description?: string;
}
