interface EmailBase {
  email?: string;
  /** Numbers you want to associate with this email. */
  phoneNumbers?: string[];
}

export interface EmailRequest extends EmailBase {}

export interface Email extends EmailBase {
  /** The `Id` of the project associated with the call. */
  projectId?: string;
}
