import { TtsCalloutRequest } from '../../tts-callout-request';
import { ConferenceCalloutRequest } from '../../conference-callout-request';
import { CustomCalloutRequest } from '../../custom-callout-request';

export interface TtsCalloutRequestData {
  'ttsCalloutRequestBody': {
    /** Type of callout. */
    method: 'ttsCallout',
    /** @see TtsCalloutRequest */
    ttsCallout: TtsCalloutRequest
  }
}

export interface ConferenceCalloutRequestData {
  'conferenceCalloutRequestBody': {
    /** Type of callout. */
    method: 'conferenceCallout',
    /** @see ConferenceCalloutRequest */
    conferenceCallout: ConferenceCalloutRequest
  }
}

export interface CustomCalloutRequestData {
  'customCalloutRequestBody': {
    /** Type of callout. */
    method: 'customCallout',
    /** @see CustomCalloutRequest */
    customCallout: CustomCalloutRequest
  }
}
