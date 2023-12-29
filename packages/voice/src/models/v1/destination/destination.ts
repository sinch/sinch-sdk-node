/**
 * Model: Destination
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * The type of device and number or endpoint to call.
 */
export interface Destination {

  /** Can be of type `number` for PSTN endpoints or of type `username` for data endpoints. */
  type: TypeEnum;
  /** If the type is `number` the value of the endpoint is a phone number. If the type is `username` the value is the username for a data endpoint. */
  endpoint: string;
}

export type TypeEnum = 'number' | 'username';

