/** @internal */
export const REGION_PATTERN = '{region}';

/** @internal */
export const AUTH_HOSTNAME = 'https://auth.sinch.com';
/** @internal */
export const CONVERSATION_HOSTNAME = `https://${REGION_PATTERN}conversation.api.sinch.com`;
/** @internal */
export const CONVERSATION_TEMPLATES_HOSTNAME = `https://${REGION_PATTERN}template.api.sinch.com`;
/** @internal */
export const ELASTIC_SIP_TRUNKING_HOSTNAME = 'https://elastic-trunking.api.sinch.com';
/** @internal */
export const FAX_HOSTNAME = 'https://fax.api.sinch.com';
/** @internal */
export const MAILGUN_HOSTNAME = `https://api.${REGION_PATTERN}mailgun.net`;
/** @internal */
export const NUMBERS_HOSTNAME = 'https://numbers.api.sinch.com';
/** @internal */
export const SMS_HOSTNAME = `https://${REGION_PATTERN}sms.api.sinch.com`;
/** @internal */
export const VERIFICATION_HOSTNAME = 'https://verification.api.sinch.com';
/** @internal */
export const VOICE_HOSTNAME = `https://calling${REGION_PATTERN}.api.sinch.com`;
/** @internal */
export const VOICE_APPLICATION_MANAGEMENT_HOSTNAME = 'https://callingapi.sinch.com';
/** @internal */
export const NUMBER_LOOKUP_HOSTNAME = 'https://lookup.api.sinch.com';

/** @internal */
export const formatRegionalizedHostname = (hostnamePattern: string, region: string) => {
  return hostnamePattern.replace(REGION_PATTERN, region);
};
