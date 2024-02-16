/**
 * Plays DTMF tones in the call.
 */
export interface SvamlInstructionSendDtmf {

  /** The `name` property. Must have the value `sendDtmf`. */
  name: 'sendDtmf';
  /** A string that determines the DTMF tones to play to the callee when the call is picked up. Valid characters are: `0-9`, `#`, and `w`. `w` renders a 500ms pause. For example, the string `ww1234#w#`, plays a 1 second pause, the DTMF tones for `1`, `2`, `3`, `4`, and `#`, followed by a 500ms pause and finally the `#` tone. This is useful if the callout destination requires a conference PIN code or an extension. If there is a calling party, it will hear progress while the DTMF is sent. */
  value?: string;
}
