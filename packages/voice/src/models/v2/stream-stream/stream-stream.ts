import { CallHeadersInner } from '../call-headers-inner';
import { StreamStreamStreamOptions } from '../stream-stream-stream-options';

export interface StreamStream {
  /** WebSocket endpoint that will accept the incoming connection for real-time audio streaming. Must be a valid WebSocket URL using either `ws://` or `wss://` (recommended). The URL must be reachable from the public internet and capable of handling the negotiated stream protocol. */
  endpoint: string;
  /** @see StreamStreamStreamOptions */
  streamOptions?: StreamStreamStreamOptions;
  /** Custom headers to be sent in the call setup. */
  callHeaders?: CallHeadersInner[];
}
