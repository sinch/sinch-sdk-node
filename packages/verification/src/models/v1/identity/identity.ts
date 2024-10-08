/**
 * Specifies the type of endpoint that will be verified and the particular endpoint. `number` is currently the only supported endpoint type.
 */
export interface Identity {

  /** Currently only `number` type is supported. */
  type: IdentityType;
  /** For type `number` use an [E.164](https://community.sinch.com/t5/Glossary/E-164/ta-p/7537)-compatible phone number. */
  endpoint: string;
}

export type IdentityType = 'number';

/** @deprecated Use IdentityType instead */
export type TypeEnum = IdentityType;
