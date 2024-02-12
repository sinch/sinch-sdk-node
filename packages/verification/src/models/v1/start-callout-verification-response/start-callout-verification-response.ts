import { LinksObject } from '../links-object';

export interface StartCalloutVerificationResponse {

  /** Verification identifier used to query for status. */
  id?: string;
  /** The value of the method used for the Verification. For Phone Call Verifications, this will always be `callout`. */
  method?: 'callout';
  /** @see LinksObject */
  _links?: LinksObject[];
}
