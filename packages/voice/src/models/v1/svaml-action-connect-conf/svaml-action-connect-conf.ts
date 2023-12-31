/**
 * Model: SvamlActionConnectConf
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { SvamlActionConnectConfConferenceDtmfOptions } from '../svaml-action-connect-conf-conference-dtmf-options';

/**
 * Connects an incoming call to a conference. Available to use in a response to an [Incoming Call Event](../../voice/tag/Callbacks/#tag/Callbacks/operation/ice) callback.
 */
export interface SvamlActionConnectConf {

  /** The name property. Must have the value `connectConf`. */
  name: 'connectConf';
  /** The unique identifier of the conference. Shouldn't exceed 64 characters. */
  conferenceId: string;
  /** @see SvamlActionConnectConfConferenceDtmfOptions */
  conferenceDtmfOptions?: SvamlActionConnectConfConferenceDtmfOptions;
  /** Means "music on hold". If this optional parameter is included, plays music to the first participant in a conference while they're alone and waiting for other participants to join. If `moh` isn't specified, the user will only hear silence while alone in the conference. */
  moh?: string;
}


