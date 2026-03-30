import { NumberWithPermissions } from '../number-with-permissions';

interface EmailBase {
  email: string;
  /** Numbers you want to associate with this email. */
  phoneNumbers: NumberWithPermissions[];
}

export interface EmailRequest extends EmailBase {}

export interface Email extends EmailBase {
  /** The `Id` of the project associated with the call. */
  projectId?: string;
  /** The date and time the email was created. */
  createdAt?: Date;
  /** The date and time the email was updated. */
  updatedAt?: Date;
}
