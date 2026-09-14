import { CallHeadersInner } from '../call-headers-inner';
import { StreamOptions } from '../stream-options';

export interface StreamDetails {
  /** WebSocket endpoint that will accept the incoming connection for real-time audio streaming. Must be a valid WebSocket URL using either `ws://` or `wss://` (recommended). The URL must be reachable from the public internet and capable of handling the negotiated stream protocol. */
  endpoint: string;
  /** @see StreamOptions */
  streamOptions?: StreamOptions;
  /** Custom headers to be sent in the call setup. */
  callHeaders?: CallHeadersInner[];
}
