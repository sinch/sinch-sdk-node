import { ActionEnum } from '../../enums';
import { WithAdditionalProperties } from '@sinch/sdk-client';

export interface FlashCallRequestEventResponse {
  /** Determines whether the verification can be executed. */
  action?: ActionEnum;
  /** @see FlashCallProperties */
  flashCall?: FlashCallProperties;
}

/** @deprecated Use FlashCallProperties instead */
export type FlashCallContent = FlashCallProperties;

export interface FlashCallProperties extends WithAdditionalProperties {
  /** The phone number that will be displayed to the user when the flash call is received on the user's phone. By default, the Sinch dashboard will randomly select the CLI that will be displayed during a phone call from a pool of numbers. If you want to set your own CLI, you can specify it in the response to the Verification Request Event. */
  cli?: string;
  /** The amount of time that a phone will ring. */
  dialTimeout?: number;
  /** The maximum time that a phone call verification will be active and can be completed. If the phone number hasn't been verified successfully during this time, then the verification request will fail. By default, the Sinch dashboard will automatically optimize dial time out during a phone call. */
  interceptionTimeout?: number;
}
