/**
 * Model: ParameterObjParameterKey
 *
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. DO NOT EDIT.
 *
 */


/**
 * The name of the parameter that will be replaced in the message body.   Letters A-Z and a-z, digits 0-9 and .-_ allowed.
 */
export interface ParameterObjParameterKey {

  /** The key is the recipient that should have the `parameter_key` replaced with the value */
  '{msisdn}'?: string;
  /** The fall-back value for omitted recipient phone numbers <a href=\"https://community.sinch.com/t5/Glossary/MSISDN/ta-p/7628\" target=\"_blank\">MSISDNs</a>. */
  default?: string;
}


