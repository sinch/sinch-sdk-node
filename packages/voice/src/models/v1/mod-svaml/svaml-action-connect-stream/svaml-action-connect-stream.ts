import { CallHeader } from '../../call-header';

/**
 * Determines how to route a call to a Stream/websocket server. Available to use in a response to an [Incoming Call Event](https://developers.sinch.com/docs/voice/api-reference/voice/tag/Callbacks/#tag/Callbacks/operation/ice) callback.
 */
export interface SvamlActionConnectStream {
  /** The name property. Must have the value `connectStream`. */
  name: 'connectStream';
  /** Specifies where to route the Stream call. */
  destination: StreamDestination;
  /** The max duration of the call in seconds (max 14400 seconds). If the call is still connected at that time, it will be automatically disconnected. */
  maxDuration?: number;
  /** "These custom parameters (headers/messages) are sent to your WebSocket server in the initial message when the ConnectStream is established." */
  callHeaders?: CallHeader[];
}

/**
 * Specifies where to route the Stream call.
 */
export interface StreamDestination {
  /** This attribute defines the streaming protocol - currently only Websocket is supported. */
  type: 'websocket' | 'Websocket';
  /** The Stream/Websocket server address. */
  endpoint: string;
}

export type ConnectStreamProps = Omit<SvamlActionConnectStream, 'name'>;
