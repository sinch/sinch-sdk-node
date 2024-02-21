import { Destination } from '../destination';
import { TtsVoice } from '../enums';

/**
 * The text-to-speech callout calls a phone number and plays a synthesized text messages or pre-recorded sound files.
 */
export interface TtsCalloutRequest {

  /** The number that will be displayed as the incoming caller. To set your own CLI, you may use your verified number or your Dashboard number. The number must be in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format. */
  cli?: string;
  /** The type of device and number or endpoint to call. */
  destination: Destination;
  /** When the destination picks up, this DTMF tones will be played to the callee. Valid characters in the string are "0"-"9", "#", and "w". A "w" will render a 500 ms pause. For example, "ww1234#w#" will render a 1s pause, the DTMF tones "1", "2", "3", "4" and "#" followed by a 0.5s pause and finally the DTMF tone for "#". This can be used if the callout destination for instance require a conference PIN code or an extension to be entered. */
  dtmf?: string;
  /** Can be either `pstn` for PSTN endpoint or `mxp` for data (app or web) clients. */
  domain?: 'pstn' | 'mxp';
  /** Can be used to input custom data. */
  custom?: string;
  /** The voice and language you want to use for the text-to-speech message. This can either be defined by the ISO 639 locale and language code or by specifying a particular voice. Supported languages and voices are detailed [here](../../../voice-locales/). */
  locale?: TtsVoice;
  /** The text that will be spoken in the text-to-speech message.  _Every application's default maximum characters allowed in text-to-speech is 600 characters. Contact support if you wish this limit to be changed._  */
  text?: string;
  /** An advanced alternative to using ```text```.  __TTS__ _Text To Speech:_ The equivalent of text but within the prompt property.  Example: _```#tts[Hello from Sinch]```_  __TTS with SSML__ _Text To Speech with Speech Synthesis Markup Language (SSML)._ This is an XML-based markup language for assisting the generation of synthetic speech in the Web and other applications. AWS Polly supports a sub-set of SSML. This allows us to use SSML-enhanced text for additional control over how Polly generates speech from the text. Details and examples of supported tags are [here](https://docs.aws.amazon.com/polly/latest/dg/supportedtags.html)    __Externally hosted media:__ Provide a URL to your own hosted media.  Please check [here](../../../supported-audio-formats/#limits) to read about audio content type and usage limits.  _Every application's default maximum allowed in TTS or TTS SSML is 600 characters. Contact support if you wish this limit to be changed._ _Several prompts can be used, separated by a semi-colon_ ```;```  Example: _```#tts[Hello from Sinch];#ssml[<speak><break time="250ms"/>Have a great day!</speak>]```_  */
  prompts?: string;
  /** If `enableAce` is set to `true` and the application has a callback URL specified, you will receive an ACE callback when the call is answered. When the callback is received, your platform must respond with a svamlet, containing the “connectconf” action in order to add the call to a conference or create the conference if it's the first call. If it's set to `false`, no ACE event will be sent to your backend. */
  enableAce?: boolean;
  /** If `enableDice` is set to `true` and the application has a callback URL specified, you will receive a DiCE callback when the call is disconnected. If it's set to `false`, no DiCE event will be sent to your backend. */
  enableDice?: boolean;
  /** <b>Note:</b> PIE callbacks are not available for DATA Calls; only PSTN and SIP calls.  If `enablePie` is set to `true` and the application has a callback URL specified, you will receive a PIE callback after the `runMenu` action executes and after the configured menu timeout has elapsed with no input. If it's set to `false`, no PIE events will be sent to your backend. */
  enablePie?: boolean;
}
