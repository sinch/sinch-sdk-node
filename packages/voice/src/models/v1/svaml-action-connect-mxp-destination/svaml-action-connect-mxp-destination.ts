/**
 * Model: SvamlActionConnectMxpDestination
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * Allows you to specify or override the final destination of the call. If the final destination of the call is not dialed, this is a required parameter.
 */
export interface SvamlActionConnectMxpDestination {

  /** The type of the definition. */
  type: string;
  /** The phone number or username of the desired call destination. */
  endpoint: string;
}


