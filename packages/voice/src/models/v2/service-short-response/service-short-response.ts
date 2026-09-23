/**
 * Abbreviated representation of a voice service, returned in list responses.
 */
export interface ServiceShortResponse {
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
  /** Name of the service */
  name: string;
  /** Description of the service */
  description?: string;
  /**
   * Indicates whether this service is set as the default for the project.
   * The default service is used when no specific service is specified in API requests.
   */
  isDefault: boolean;
}
