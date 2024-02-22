import { CallHeader } from '../../call-header';
import { Destination } from '../../destination';

/**
 * Determines how an application-to-application call is connected. Available to use in a response to an [Incoming Call Event](../../voice/tag/Callbacks/#tag/Callbacks/operation/ice) callback.
 */
export interface SvamlActionConnectMxp {

  /** The name property. Must have the value `connectMxp`. */
  name: 'connectMxp';
  /** Allows you to specify or override the final destination of the call. If the final destination of the call is not dialed, this is a required parameter. */
  destination?: Destination;
  /** An optional parameter that allows you to specify or override call headers provided to the receiving Sinch SDK client. Read more about call headers [here](../../call-headers/). */
  callHeaders?: CallHeader[];
}

export type ConnectMxpProps = Omit<SvamlActionConnectMxp, 'name'>;
