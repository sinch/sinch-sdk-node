/**
 * Response message containing the callbacks configuration for a specific project
 */
export interface CallbackConfiguration {
  projectId?: string;
  hmacSecret?: string;
}
