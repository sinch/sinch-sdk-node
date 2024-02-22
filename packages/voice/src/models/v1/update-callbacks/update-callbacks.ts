export interface UpdateCallbacks {

  /** Contains primary and/or fallback callback URLs */
  url?: CallbacksUrl;
}

/**
 * Contains primary and or fallback callback URLs
 */
export interface CallbacksUrl {

  /** Your primary callback URL */
  primary?: string;
  /** Your fallback callback URL */
  fallback?: string;
}
