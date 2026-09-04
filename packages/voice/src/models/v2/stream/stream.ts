import { StreamDetails } from '../stream-details';

/**
 * Routes the call to a WebSocket stream endpoint for real-time audio processing.
 */
export interface Stream {
  /** Routes the call to a WebSocket stream endpoint for real-time audio processing. */
  type: TypeEnum;
  /** @see StreamDetails */
  stream: StreamDetails;
}
export type TypeEnum = 'STREAM' | string;
