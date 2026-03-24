import { LineResponse } from '../line-response';
import { RndResponse } from '../rnd-response';
import { SimSwapResponse } from '../sim-swap-response';
import { VoIPDetectionResponse } from '../voip-detection-response';

export interface NumberLookupResponse {
  /** An object containing information about the line type of the number. */
  line?: LineResponse;
  /** An object containing information about the SimSwap verification performed on the number. */
  simSwap?: SimSwapResponse;
  /** An object containing information about the VoIP detection performed on the number. */
  voIPDetection?: VoIPDetectionResponse;
  /** An object containing information whether number is disconnected. */
  rnd?: RndResponse;
  /** ISO 3166-1 alpha-2 two-letter country identifier */
  countryCode?: string;
  /** The identifier for a trace. */
  traceId?: string;
  /** Requested MSISDN in E.164 format. */
  number?: string;
}
