import { ConferenceDtmfOptions } from '../../conference-dtmf-options';
import { MusicOnHold } from '../../music-on-hold';

/**
 * Connects an incoming call to a conference. Available to use in a response to an [Incoming Call Event](../../voice/tag/Callbacks/#tag/Callbacks/operation/ice) callback.
 */
export interface SvamlActionConnectConf {

  /** The name property. Must have the value `connectConf`. */
  name: 'connectConf';
  /** The unique identifier of the conference. Shouldn't exceed 64 characters. */
  conferenceId: string;
  /** Options to control how DTMF signals are used by the participant in the conference. For information on how to use this feature, read more [here](../../conference-dtmf). */
  conferenceDtmfOptions?: ConferenceDtmfOptions;
  /** Means "music on hold". If this optional parameter is included, plays music to the first participant in a conference while they're alone and waiting for other participants to join. If `moh` isn't specified, the user will only hear silence while alone in the conference. */
  moh?: MusicOnHold;
}

export type ConnectConfProps = Omit<SvamlActionConnectConf, 'name'>;
