import { LinksObject } from '../links-object';
import { WithAdditionalProperties } from '@sinch/sdk-client';

export interface StartFlashCallVerificationResponse {

  /** Verification identifier used to query for status. */
  id?: string;
  /** The value of the method used for the Verification. For Flashcall Verifications, this will always be `flashCall`. */
  method?: 'flashcall';
  /** The response contains the `cliFilter` and `interceptionTimeout` properties. */
  flashCall?: FlashCallContent;
  /** @see LinksObject */
  _links?: LinksObject[];
}

interface FlashCallContent extends WithAdditionalProperties {

  /** Filter that should be applied for incoming calls to intercept the flash call. */
  cliFilter: string;
  /** Amount of seconds client should wait for the flash call. */
  interceptionTimeout: number;
  /** The time in seconds allowed for reporting the code after which the verification will expire. */
  reportTimeout?: number;
  /** Used by the mobile SDKs, this setting makes the handset deny the flash call after the set time in seconds. */
  denyCallAfter?: number;
}
