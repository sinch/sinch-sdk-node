/**
 * The request to update the callbacks configuration for the current project
 */
export interface CallbackConfigurationUpdate {
  /** The HMAC secret to be updated for the specified project */
  hmacSecret?: string;
}
