import { CallMessage } from '../call-message';
import { LocationMessageItem } from '../location-message';
import { TextMessageItem } from '../text-message';
import { UrlMessage } from '../url-message';
import { CalendarMessage } from '../calendar-message';
import { ShareLocationMessage } from '../share-location-message';

/**
 * A choice is an action the user can take such as buttons for quick replies or other call to actions.
 */
export type Choice =
  CallMessageChoice
  | LocationMessageChoice
  | TextMessageChoice
  | UrlMessageChoice
  | CalendarMessageChoice
  | ShareLocationMessageChoice;

export interface ChoiceBase {
  /** An optional field. This data will be returned in the ChoiceResponseMessage. The default is message_id_{text, title}. */
  postback_data?: string;
}

/**
 * Message for triggering a call.
 */
export interface CallMessageChoice extends ChoiceBase {
  /** @see CallMessage */
  call_message: CallMessage;
  // Exclude other choice types
  location_message?: never;
  text_message?: never;
  url_message?: never;
  calendar_message?: never;
  share_location_message?: never;
}

/**
 * Message containing geographic location.
 */
export interface LocationMessageChoice extends ChoiceBase {
  /** @see LocationMessageItem */
  location_message: LocationMessageItem;
  // Exclude other choice types
  call_message?: never;
  text_message?: never;
  url_message?: never;
  calendar_message?: never;
  share_location_message?: never;
}

/**
 * A message containing only text.
 */
export interface TextMessageChoice extends ChoiceBase {
  /** @see TextMessageItem */
  text_message: TextMessageItem;
  // Exclude other choice types
  call_message?: never;
  location_message?: never;
  url_message?: never;
  calendar_message?: never;
  share_location_message?: never;
}

/**
 * A generic URL message.
 */
export interface UrlMessageChoice extends ChoiceBase {
  /** @see UrlMessage */
  url_message: UrlMessage;
  // Exclude other choice types
  call_message?: never;
  location_message?: never;
  text_message?: never;
  calendar_message?: never;
  share_location_message?: never;
}

/**
 * Message containing details about a calendar event.
 */
export interface CalendarMessageChoice extends ChoiceBase {
  /** @see CalendarMessage */
  calendar_message?: CalendarMessage;
  // Exclude other choice types
  call_message?: never;
  location_message?: never;
  text_message?: never;
  url_message?: never;
  share_location_message?: never;
}

/**
 * Message requesting location from a user.
 */
export interface ShareLocationMessageChoice extends ChoiceBase {
  /** @see ShareLocationMessage */
  share_location_message?: ShareLocationMessage;
  // Exclude other choice types
  call_message?: never;
  location_message?: never;
  text_message?: never;
  url_message?: never;
  calendar_message?: never;
}
