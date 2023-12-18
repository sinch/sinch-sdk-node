/**
 * Model: InitiateVerificationResource
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { Identity } from '../identity';
import { InitiateVerificationResourceFlashCallOptions } from '../initiate-verification-resource-flash-call-options';

export interface InitiateVerificationResource {

  /** @see Identity */
  identity: Identity;
  /** The type of the verification request. */
  method: MethodEnum;
  /** Used to pass your own reference in the request for tracking purposes. */
  reference?: string;
  /** Can be used to pass custom data in the request. */
  custom?: string;
  /** @see InitiateVerificationResourceFlashCallOptions */
  flashCallOptions?: InitiateVerificationResourceFlashCallOptions;
}

export type MethodEnum = 'sms' | 'flashCall' | 'callout' | 'seamless';
