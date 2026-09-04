import { VoiceRelayDetails } from '../voice-relay-details';

/**
 * Routes the call through the Voice Relay service, enabling real-time speech-to-text (STT) and text-to-speech (TTS) via a WebSocket connection to the application backend.
 */
export interface VoiceRelay {
  /** Connects to the Voice Relay service to enable STT and TTS services... */
  type: TypeEnum;
  /** @see VoiceRelayDetails */
  voiceRelay: VoiceRelayDetails;
}
export type TypeEnum = 'VOICE_RELAY' | string;
