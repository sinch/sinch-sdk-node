import { StreamStream } from '../stream-stream';

/**
 * Routes the call to a WebSocket stream endpoint for real-time audio processing.
 */
export interface Stream {
  /** Routes the call to a WebSocket stream endpoint for real-time audio processing. */
  type: TypeEnum;
  /** @see StreamStream */
  stream: StreamStream;
}
export type TypeEnum = 'STREAM' | string;
