import { CallHeadersInner } from '../call-headers-inner';
import { VoiceName } from '../voice-name';

export interface VoiceRelayDetails {
  /** URL to the server that will accept the web-socket request */
  endpoint: string;
  /** Allow \"barge-in\" during text-to-speech (TTS) playback.  When `true`, TTS playback is interrupted as soon as inbound speech is detected, unless the currently playing content is marked as uninterruptible.  When `false`, TTS playback continues uninterrupted, but an interruption signal is still sent over the WebSocket so the client application can choose to stop playback manually if needed. */
  enableInterruptions?: boolean;
  /** Name of the voice to be used when synthesizing speech. This is the default voice used, if no override voice is provided in the web-socket TTS message. */
  ttsVoice: VoiceName;
  /** BCP-47 language tag used for speech-to-text transcription of the inbound audio.  This value determines which language model is used for transcription. */
  sttLanguage: string;
  /** Custom headers to be sent in the call setup. */
  callHeaders?: CallHeadersInner[];
}
/** Validation regex for sttLanguage */
export const sttLanguagePattern = /^[a-z]{2,3}(-[A-Z][a-z]{3})?(-([A-Z]{2}|[0-9]{3}))?$/;
