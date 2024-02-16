/**
 * Determines how a PSTN call is connected. Available to use in a response to an [Incoming Call Event](../../voice/tag/Callbacks/#tag/Callbacks/operation/ice) callback.
 */
export interface SvamlActionConnectPstn {

  /** The name property. Must have the value `connectPstn`. */
  name: 'connectPstn';
  /** Used to override where PSTN call is connected. If not specified, the extension the client called is used. */
  number?: string;
  /** Specifies the locale. Uses the language code according to `ISO 639`, a dash (`-`), and a country code according to `ISO 3166-1 alpha-2`. If not specified, the default locale of `en-US` is used. */
  locale?: string;
  /** The max duration of the call in seconds (max 14400 seconds). If the call is still connected at that time, it will be automatically disconnected. */
  maxDuration?: number;
  /** The max duration the call will wait in ringing unanswered state before terminating with ```TIMEOUT/NO ANSWER``` on PSTN leg and ```NA/BUSY```on MXP leg. */
  dialTimeout?: number;
  /** Used to override the CLI (or caller ID) of the client. The phone number of the person who initiated the call is shown as the CLI. To set your own CLI, you may use your verified number or your Dashboard virtual number. */
  cli?: string;
  /** If enabled, suppresses [ACE](../../voice/tag/Callbacks/#tag/Callbacks/operation/ace) and [DICE](../../voice/tag/Callbacks/#tag/Callbacks/operation/dice) callbacks for the call. */
  suppressCallbacks?: boolean;
  /** A string that determines the DTMF tones to play to the callee when the call is picked up. Valid characters are: `0-9`, `#`, and `w`. `w` renders a 500ms pause. For example, the string `ww1234#w#`, plays a 1-second pause, the DTMF tones for `1`, `2`, `3`, `4`, and `#`, followed by a 500ms pause and finally the `#` tone. This is useful if the callout destination requires a conference PIN code or an extension. If there is a calling party, it will hear progress while the DTMF is sent. */
  dtmf?: string;
  /** The locale's tone to play while ringing. */
  indications?: string;
  /** An optional property used to enable [Answering Machine Detection](/docs/voice/api-reference/amd_v2) (AMD). */
  amd?: EnableAmd;
}

export interface EnableAmd {

  /** Sets whether AMD is enabled. */
  enabled?: boolean;
}

