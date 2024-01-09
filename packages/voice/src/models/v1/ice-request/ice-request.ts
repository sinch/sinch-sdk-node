/**
 * Model: IceRequest
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { CallHeader } from '../call-header';
import { IceRequestTo } from '../ice-request-to';
import { IceRequestUserRate } from '../ice-request-user-rate';

/**
 * The request body of an Incoming Call Event.
 */
export interface IceRequest {

  /** Must have the value `ice`. */
  event?: 'ice';
  /** The unique ID assigned to this call. */
  callId?: string;
  /** The path of the API resource. */
  callResourceUrl?: string;
  /** The timestamp in UTC format. */
  timestamp?: Date;
  /** The current API version. */
  version?: number;
  /** A string that can be used to pass custom information related to the call. */
  custom?: string;
  /** @see IceRequestUserRate */
  userRate?: IceRequestUserRate;
  /** The number that will be displayed to the recipient of the call. To set your own CLI, you may use your verified number or your Dashboard virtual number and add it to the `connectPSTN` SVAML response to the Incoming Call Event request.  It must be in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format. */
  cli?: string;
  /** @see IceRequestTo */
  to?: IceRequestTo;
  /** The domain destination of the incoming call. */
  domain?: string;
  /** The unique application key. You can find it in the Sinch [dashboard](https://dashboard.sinch.com/voice/apps). */
  applicationKey?: string;
  /** The origination domain of the incoming call. */
  originationType?: string;
  /** The duration of the call in seconds. */
  duration?: number;
  /** The redirected dialled number identification service. */
  rdnis?: string;
  /** If the call is initiated by a Sinch SDK client, call headers are the headers specified by the *caller* client. Read more about call headers [here](../../../call-headers). */
  callHeaders?: CallHeader[];
}


