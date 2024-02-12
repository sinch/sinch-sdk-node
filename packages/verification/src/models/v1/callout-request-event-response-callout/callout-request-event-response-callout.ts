import { CalloutRequestEventResponseCalloutSpeech } from '../callout-request-event-response-callout-speech';

export interface CalloutRequestEventResponseCallout {

  /** The Phone Call PIN that should be entered by the user. Sinch servers automatically generate PIN codes for Phone Call verification. If you want to set your own code, you can specify it in the response to the Verification Request Event. */
  code?: string;
  /** @see CalloutRequestEventResponseCalloutSpeech */
  speech?: CalloutRequestEventResponseCalloutSpeech;
}
