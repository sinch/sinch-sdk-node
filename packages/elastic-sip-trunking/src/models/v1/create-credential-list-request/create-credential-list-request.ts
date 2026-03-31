export interface CreateCredentialListRequest {
  /** The name of the credential list. */
  name: string;
  /** List of credentials */
  credentials: CreateCredential[];
}

export interface CreateCredential {
  /** The username for the credential. */
  username: string;
  /** The password for the credential. */
  password: string;
}
