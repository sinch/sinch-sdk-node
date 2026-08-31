export interface StreamStreamStreamOptions {
  /** Defines the version of the stream protocol. */
  version?: number;
  /** Defines the audio codec/format used for the stream audio payload.  Currently, only `PCM` is supported (uncompressed raw audio). Use `sampleRate` to configure the sampling rate for the stream. */
  codec?: CodecEnum;
  /** Defines the audio sampling rate (Hz) used for the stream.  For calls that traverse the PSTN, audio is typically sampled at 8 kHz, so using a higher value will not improve perceived quality.  Higher sample rates can be useful for non-PSTN scenarios (for example, SIP/streaming paths), but will increase bandwidth usage and processing load. */
  sampleRate?: SampleRateEnum;
}
export type CodecEnum = 'PCM' | string;
export type SampleRateEnum = 8000 | 16000 | 24000 | 44100 | 48000 | 96000 | number;
