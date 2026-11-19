/**
 * Specifies the type of endpoint that will be verified and the particular endpoint. `number` is currently the only supported endpoint type.
 */
export interface Identity {

  /** Currently only `number` type is supported. */
  type: IdentityType;
  /** For type `number` use an [E.164](https://support.sinch.com/hc/en-us/articles/52299961578771-E-164)-compatible phone number. */
  endpoint: string;
}

export type IdentityType = 'number';

/** @deprecated Use IdentityType instead */
export type TypeEnum = IdentityType;
