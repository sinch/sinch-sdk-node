import { CallHeader } from '../../call-header';
import { MusicOnHold } from '../../enums';
import { DestinationSip } from '../../destination';

/**
 * Determines how to route a call to a SIP server. Available to use in a response to an [Incoming Call Event](https://developers.sinch.com/docs/voice/api-reference/voice/tag/Callbacks/#tag/Callbacks/operation/ice) callback.
 */
export interface SvamlActionConnectSip {
  /** The name property. Must have the value `connectSip`. */
  name: 'connectSip';
  /** Specifies where to route the SIP call. */
  destination: DestinationSip;
  /** The max duration of the call in seconds (max 14400 seconds). If the call is still connected at that time, it will be automatically disconnected. */
  maxDuration?: number;
  /** Used to override the CLI (or caller ID) of the client. The phone number of the person who initiated the call is shown as the CLI. To set your own CLI, you may use your verified number or your Dashboard virtual number. */
  cli?: string;
  /** An optional parameter to specify the SIP transport protocol. If unspecified, UDP is used. */
  transport?: 'udp' | 'tcp' | 'tls' | 'UDP' | 'TCP' | 'TLS' | string;
  /** If enabled, suppresses [ACE](https://developers.sinch.com/docs/voice/api-reference/voice/tag/Callbacks/#tag/Callbacks/operation/ace) and [DICE](https://developers.sinch.com/docs/voice/api-reference/voice/tag/Callbacks/#tag/Callbacks/operation/dice) callbacks for the call. */
  suppressCallbacks?: boolean;
  /** [Private SIP headers](https://developers.sinch.com/docs/voice/api-reference/sip-trunking/#receiving-calls-from-sinch-platform-to-your-sip-infrastructure) to send with the call. */
  callHeaders?: CallHeader[];
  /** Means \"music on hold\". If this optional parameter is included, plays music to the connected participant if the SIP call is placed on hold. If `moh` isn't specified and the SIP call is placed on hold, the user will only hear silence while during the holding period . */
  moh?: MusicOnHold;
}

export type ConnectSipProps = Omit<SvamlActionConnectSip, 'name'>;
