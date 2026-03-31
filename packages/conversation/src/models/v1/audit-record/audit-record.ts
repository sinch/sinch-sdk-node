import { ConsentsListType, ConsentOperation, ConsentOrigin } from '../enums';

/**
 * Represents a consent audit record from the Conversation API.
 */
export interface AuditRecord {
  /** The origin from the opt-out or opt-in. This could be the Batch API or an MO (when matched with an end-user MO). */
  origin: ConsentOrigin;
  /** The operation that the audit record refers to. Can be INSERT, UPDATE or DELETE. */
  operation: ConsentOperation;
  /** The list type of the consent list the audit record refers to. */
  list_type: ConsentsListType;
  /** The project ID associated with the consent list the audit record refers to. */
  project_id: string;
  /** The app ID associated with the consent list the audit record refers to. */
  app_id: string;
  /** Datetime of when the consent list audit record happened. */
  datetime: Date;
}
