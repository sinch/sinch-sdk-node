/**
 * Settings related to contact management for the project.
 */
export interface ContactSettings {
  /** Enables the Unified Contact ID feature. When enabled, contacts with the same phone number across SMS, RCS, and MMS channels are treated as a single entity. [See the documentation](https://developers.sinch.com/docs/conversation/unified-contact-id/) for details and requirements.  */
  unified_contact_id_enabled?: boolean;
}
