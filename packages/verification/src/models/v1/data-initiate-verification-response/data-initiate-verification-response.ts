/**
 * Model: DataInitiateVerificationResponse
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */

import { DataInitiateVerificationResponseSeamless } from '../data-initiate-verification-response-seamless';
import { LinksObject } from '../links-object';

export interface DataInitiateVerificationResponse {

  /** Verification identifier used to query for status. */
  id: string;
  /** The value of the method used for the Verification. For Data Verifications, this will always be `seamless`. */
  method?: MethodEnum;
  /** @see DataInitiateVerificationResponseSeamless */
  seamless?: DataInitiateVerificationResponseSeamless;
  /** @see LinksObject */
  _links?: LinksObject;
}

export type MethodEnum = 'seamless';
