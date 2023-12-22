/**
 * Model: GetCallbacksUrl
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * Gets primary and if configured fallback callback URLs
 */
export interface GetCallbacksUrl {

  /** Your primary callback URL */
  primary?: string;
  /** Your fallback callback URL (returned if configured). It is used only if Sinch platform gets a timeout or error from your primary callback URL. */
  fallback?: string;
}


