export interface IdentityConflict {
  /** The identity value (e.g., phone number) that is duplicated across contacts. */
  identity?: string;
  /** List of channels where this identity is present. */
  channels?: string[];
  /** List of contact IDs that share this identity. */
  contact_ids?: string[];
}
