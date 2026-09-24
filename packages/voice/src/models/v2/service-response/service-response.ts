import { CallBehaviors } from '../call-behaviors';

/**
 * Full representation of a voice service resource, including its configuration and call behavior.
 */
export interface ServiceResponse {
  /** The ID of the service used. */
  serviceId: string;
  /** The `Id` of the project associated with the call. */
  projectId: string;
  /** Timestamp (RFC 3339) indicating when the service was created. */
  createTime: Date;
  /**
   * Timestamp (RFC 3339) indicating when the service was last updated.
   *
   * Omitted if no updates were performed on this service.
   */
  updateTime?: Date;
  /** Voice service name. No leading or trailing whitespaces allowed. */
  name: string;
  /** Description of the service */
  description?: string;
  /**
   * Indicates whether this service is set as the default for the project.
   * The default service is used when no specific service is specified in API requests.
   */
  isDefault: boolean;
  /** @see CallBehaviors */
  callBehavior?: CallBehaviors;
}
