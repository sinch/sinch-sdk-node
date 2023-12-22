/**
 * Model: SvamlActionConnectMxp
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { CallHeader } from '../call-header';
import { SvamlActionConnectMxpDestination } from '../svaml-action-connect-mxp-destination';

/**
 * Determines how an application-to-application call is connected. Available to use in a response to an [Incoming Call Event](../../voice/tag/Callbacks/#tag/Callbacks/operation/ice) callback.
 */
export interface SvamlActionConnectMxp {

  /** The name property. Must have the value `connectMxp`. */
  name: 'connectMxp';
  /** @see SvamlActionConnectMxpDestination */
  destination?: SvamlActionConnectMxpDestination;
  /** An optional parameter that allows you to specify or override call headers provided to the receiving Sinch SDK client. Read more about call headers [here](../../call-headers/). */
  callheaders?: CallHeader[];
}


