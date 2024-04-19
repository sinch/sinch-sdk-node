import { LinksObject } from '../links-object';

export interface StartSeamlessVerificationResponse {

  /** Verification identifier used to query for status. */
  id: string;
  /** The value of the method used for the Verification. For Data Verifications, this will always be `seamless`. */
  method?: 'seamless';
  /** The response contains the target URI. */
  seamless?: SeamlessContent;
  /** @see LinksObject */
  _links?: LinksObject[];
}

interface SeamlessContent {

  /** The target URI. */
  targetUri?: string;
}
