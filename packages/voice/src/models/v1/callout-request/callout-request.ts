/**
 * Model: CalloutRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { ConferenceCalloutRequest } from '../conference-callout-request';
import { CustomCalloutRequest } from '../custom-callout-request';
import { TtsCalloutRequest } from '../tts-callout-request';

/**
 * Currently three types of callouts are supported: conference callouts, text-to-speech callouts and custom callouts. The custom callout is the most flexible, but text-to-speech and conference callouts are more convenient.
 */
export interface CalloutRequest {

  /** Sets the type of callout. */
  method: MethodEnum;
  /** @see ConferenceCalloutRequest */
  conferenceCallout?: ConferenceCalloutRequest;
  /** @see TtsCalloutRequest */
  ttsCallout?: TtsCalloutRequest;
  /** @see CustomCalloutRequest */
  customCallout?: CustomCalloutRequest;
}

export type MethodEnum = 'conferenceCallout' | 'ttsCallout' | 'customCallout';

