/**
 * Model: ConferenceCalloutRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { ConferenceCalloutRequestConferenceDtmfOptions } from '../conference-callout-request-conference-dtmf-options';
import { Destination } from '../destination';

/**
 * The conference callout calls a phone number or a user. When the call is answered, it's connected to a conference room.
 */
export interface ConferenceCalloutRequest {

  /** The number that will be displayed as the incoming caller. To set your own CLI, you may use your verified number or your Dashboard number. The number must be in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format. */
  cli?: string;
  /** @see Destination */
  destination: Destination;
  /** The conferenceId of the conference to which you want the callee to join. If the conferenceId doesn't exist a conference room will be created. */
  conferenceId: string;
  /** @see ConferenceCalloutRequestConferenceDtmfOptions */
  conferenceDtmfOptions?: ConferenceCalloutRequestConferenceDtmfOptions;
  /** When the destination picks up, this DTMF tones will be played to the callee. Valid characters in the string are "0"-"9", "#" and "w". A "w" will render a 500 ms pause. Example: "ww1234#w#" will render a 1s pause, the DTMF tones "1", "2", "3", "4" and "#" followed by a 0.5s pause and finally the DTMF tone for "#". This can be used if the callout destination for instance require a conference PIN code or an extension to be entered. */
  dtmf?: string;
  maxDuration?: number;
  /** If `enableAce` is set to true and the application has a callback URL specified, you will receive an ACE callback when the call is answered. When the callback is received, your platform must respond with a svamlet containing the `connectConf` action in order to add the call to a conference or create the conference if it's the first call. If it's set to false, no ACE event will be sent to your backend.<br><b>Note </b> if the call is towards an InApp destination `type:` `username`, then no ACE will be issued when the call is connected, even if `enableAce` is present in the callout request. */
  enableAce?: boolean;
  /** If `enableDice` is set to true and the application has a callback URL specified, you will receive a DiCE callback when the call is disconnected. If it's set to false, no DiCE event will be sent to your backend.<br><b>Note</b> if the call is towards an InApp destination `type:` `username`, then no DICE will be issued at the end of the call, even if `enableDice` is present in the callout request. */
  enableDice?: boolean;
  /** If `enablePie` is set to true and the application has a callback URL specified, you will receive a PIE callback after a `runMenu` action, with the information of the action that the user took. If it's set to false, no PIE event will be sent to your backend. */
  enablePie?: boolean;
  /** The voice and language you want to use for the prompts. This can either be defined by the ISO 639 locale and language code or by specifying a particular voice. Supported languages and voices are detailed [here](../../../voice-locales/) */
  locale?: string;
  /** The text that will be spoken as a greeting. */
  greeting?: string;
  /** Means "music-on-hold." It's an optional parameter that specifies what the first participant should listen to while they're alone in the conference, waiting for other participants to join. It can take one of these pre-defined values:<ul><li>`ring` (progress tone)</li><li>`music1` (music file)</li><li>`music2` (music file)</li><li>`music3` (music file)</li></ul></br>If no “music-on-hold” is specified, the user will only hear silence. */
  mohClass?: string;
  /** Used to input custom data. */
  custom?: string;
  /** can be either “pstn” for PSTN endpoint or “mxp” for data (app or web) clients. */
  domain?: string;
}


