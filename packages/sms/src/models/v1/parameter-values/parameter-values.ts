/**
 * The name of the parameter that will be replaced in the message body.   Letters A-Z and a-z, digits 0-9 and .-_ allowed.
 */
export interface ParameterValues {
  /** The key is the recipient that should have the `parameter_key` replaced with the value */
  [msisdn: string]: string | undefined;
  /** The fall-back value for omitted recipient phone numbers <a href=\"https://support.sinch.com/hc/en-us/articles/52299915309075-MSISDN\" target=\"_blank\">MSISDNs</a>. */
  default?: string;
}

/** @deprecated Use ParameterValues instead */
export interface ParameterObjParameterKey {

  /** The key is the recipient that should have the `parameter_key` replaced with the value */
  '{msisdn}'?: string;
  /** The fall-back value for omitted recipient phone numbers <a href=\"https://support.sinch.com/hc/en-us/articles/52299915309075-MSISDN\" target=\"_blank\">MSISDNs</a>. */
  default?: string;
}


