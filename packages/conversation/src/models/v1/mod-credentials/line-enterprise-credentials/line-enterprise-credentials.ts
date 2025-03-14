/**
 * If the channel property is set to LINE for this entry of the channel_credentials array, you must include either the line_credentials object or the line_enterprise_credentials object in the entry as well.
 */
export type LineEnterpriseCredentials = LineEnterpriseCredentialsJapan | LineEnterpriseCredentialsThailand;

export interface LineEnterpriseCredentialsJapan  {
  /** When an app contains multiple LINE or LINE Enterprise credentials, one of the credentials needs to be defined as the default. Setting this property to `true` marks the corresponding credentials as the default credentials. */
  is_default?: boolean;
  /** LINE Credentials Japan */
  line_japan: LineEnterpriseCredentialsPair;
  line_thailand?: never;
}

export interface LineEnterpriseCredentialsThailand  {
  /** When an app contains multiple LINE or LINE Enterprise credentials, one of the credentials needs to be defined as the default. Setting this property to `true` marks the corresponding credentials as the default credentials. */
  is_default?: boolean;
  /** LINE Credentials Thailand */
  line_thailand: LineEnterpriseCredentialsPair;
  line_japan?: never;
}

export interface LineEnterpriseCredentialsPair {
  /** The token for the LINE channel to which you are connecting. */
  token: string;
  /** The secret for the LINE channel to which you are connecting. */
  secret: string;
}
