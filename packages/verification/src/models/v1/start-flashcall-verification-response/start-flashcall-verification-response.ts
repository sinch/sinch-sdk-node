import { LinksObject } from '../links-object';

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

interface FlashCallContent {

  /** Filter that should be applied for incoming calls to intercept the Flashcall. */
  cliFilter: string;
  /** Amount of seconds client should wait for the Flashcall. */
  interceptionTimeout: number;
  /** The time in seconds allowed for reporting the code after which the verification will expire. */
  reportTimeout?: number;
  /** Used by the SDKs, this setting makes the handset deny the flashcall after the set time in seconds. */
  denyCallAfter?: number;
}
