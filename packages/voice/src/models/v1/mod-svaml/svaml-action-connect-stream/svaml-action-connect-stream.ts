import { CallHeader } from '../../call-header';
import { DestinationStream } from '../../destination';

/**
 * Determines how to route a call to a Stream/websocket server. Available to use in a response to an [Incoming Call Event](https://developers.sinch.com/docs/voice/api-reference/voice/tag/Callbacks/#tag/Callbacks/operation/ice) callback.
 */
export interface SvamlActionConnectStream {
  /** The name property. Must have the value `connectStream`. */
  name: 'connectStream';
  /** Specifies where to route the Stream call. */
  destination: DestinationStream;
  /** The max duration of the call in seconds (max 14400 seconds). If the call is still connected at that time, it will be automatically disconnected. */
  maxDuration?: number;
  /** "These custom parameters (headers/messages) are sent to your WebSocket server in the initial message when the ConnectStream is established." */
  callHeaders?: CallHeader[];
}

export type ConnectStreamProps = Omit<SvamlActionConnectStream, 'name'>;
