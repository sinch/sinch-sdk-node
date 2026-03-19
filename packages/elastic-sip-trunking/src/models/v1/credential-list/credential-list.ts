import { Credential } from '../credential';

export interface CredentialList {
  /** The name of the credential list. */
  name: string;
  /** The ID of the credential list. */
  id: string;
  /** The date and time that the credential list was created. */
  createTime: Date;
  /** The date and time that the credential list was last modified. */
  updateTime: Date | null;
  /** The ID of the account. */
  projectId: string;
  /** The list of credentials. */
  credentials: Credential[];
}
