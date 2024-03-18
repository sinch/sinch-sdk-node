export interface ContactId {
  /** The ID of the contact. */
  contact_id: string;
  // Exclude other recipient types
  identified_by?: never;
}
