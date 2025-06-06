export interface NotFoundErrorDetails {
  /** */
  type?: string;
  /** The type of the resource that was not found. */
  resourceType?: string;
  /** The name of the resource that was not found. */
  resourceName?: string;
  /** The owner of the resource that was not found. */
  owner?: string;
  /** A description of the error. */
  description?: string;
}
