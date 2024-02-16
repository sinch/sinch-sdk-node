import { CallHeader } from '../../call-header';
import { Participant } from '../../participant';
import { VoicePrice } from '../../voice-price';

/**
 * The request body of an Incoming Call Event.
 */
export interface IceRequest {

  /** Must have the value `ice`. */
  event?: 'ice';
  /** The unique ID assigned to this call. */
  callid?: string;
  /** The path of the API resource. */
  callResourceUrl?: string;
  /** The timestamp in UTC format. */
  timestamp?: Date;
  /** The current API version. */
  version?: number;
  /** A string that can be used to pass custom information related to the call. */
  custom?: string;
  /** The rate that will be charged for the call established to the original destination. If the SVAML response specifies another destination, the same rate may not apply. */
  userRate?: VoicePrice;
  /** The number that will be displayed to the recipient of the call. To set your own CLI, you may use your verified number or your Dashboard virtual number and add it to the `connectPSTN` SVAML response to the Incoming Call Event request.  It must be in [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537) format. */
  cli?: string;
  /** An object containing information about the recipient of the call. */
  to?: Participant;
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


