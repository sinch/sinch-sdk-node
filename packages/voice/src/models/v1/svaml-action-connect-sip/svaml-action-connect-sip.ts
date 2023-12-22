/**
 * Model: SvamlActionConnectSip
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { CallHeader } from '../call-header';
import { SvamlActionConnectSipDestination } from '../svaml-action-connect-sip-destination';

/**
 * Determines how to route a call to a SIP server. Available to use in a response to an [Incoming Call Event](../../../voice/tag/Callbacks/#tag/Callbacks/operation/ice) callback.
 */
export interface SvamlActionConnectSip {

  /** The name property. Must have the value `connectSip`. */
  name: 'connectSip';
  /** @see SvamlActionConnectSipDestination */
  destination: SvamlActionConnectSipDestination;
  /** The max duration of the call in seconds (max 14400 seconds). If the call is still connected at that time, it will be automatically disconnected. */
  maxDuration?: number;
  /** Used to override the CLI (or caller ID) of the client. The phone number of the person who initiated the call is shown as the CLI. To set your own CLI, you may use your verified number or your Dashboard virtual number. */
  cli?: string;
  /** An optional parameter to specify the SIP transport protocol. If unspecified, UDP is used. */
  transport?: string;
  /** If enabled, suppresses [ACE](../../voice/tag/Callbacks/#tag/Callbacks/operation/ace) and [DICE](../../voice/tag/Callbacks/#tag/Callbacks/operation/dice) callbacks for the call. */
  suppressCallbacks?: boolean;
  /** [Private SIP headers](../../sip-trunking/#receiving-calls-from-sinch-platform-to-your-sip-infrastructure) to send with the call. */
  callHeaders?: CallHeader[];
  /** Means \"music on hold\". If this optional parameter is included, plays music to the connected participant if the SIP call is placed on hold. If `moh` isn\'t specified and the SIP call is placed on hold, the user will only hear silence while during the holding period . */
  moh?: string;
}


