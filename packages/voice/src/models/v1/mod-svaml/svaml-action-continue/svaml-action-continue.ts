/**
 * Continues to set up a call. Available to use in a response to an [Answered Call Event](https://developers.sinch.com/docs/voice/api-reference/voice/tag/Callbacks/#tag/Callbacks/operation/ace) callback.
 */
export interface SvamlActionContinue {
  /** The name property. Must have the value `continue`. */
  name: 'continue';
}
