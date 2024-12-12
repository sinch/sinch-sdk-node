export const REGION_PATTERN = '{region}';

export const AUTH_HOSTNAME = 'https://auth.sinch.com';
export const CONVERSATION_HOSTNAME = `https://${REGION_PATTERN}conversation.api.sinch.com`;
export const CONVERSATION_TEMPLATES_HOSTNAME = `https://${REGION_PATTERN}template.api.sinch.com`;
export const ELASTIC_SIP_TRUNKING_HOSTNAME = 'https://elastic-trunking.api.sinch.com';
export const FAX_HOSTNAME = `https://${REGION_PATTERN}fax.api.sinch.com`;
export const MAILGUN_HOSTNAME = `https://api.${REGION_PATTERN}mailgun.net`;
export type MailgunStorageHostname =
  'https://storage-us-east4.api.mailgun.net'
  | 'https://storage-us-west1.api.mailgun.net'
  | 'https://storage-europe-west1.api.mailgun.net'
  | string;
export const NUMBERS_HOSTNAME = 'https://numbers.api.sinch.com';
export const SMS_HOSTNAME = `https://${REGION_PATTERN}sms.api.sinch.com`;
export const VERIFICATION_HOSTNAME = 'https://verification.api.sinch.com';
export const VOICE_HOSTNAME = `https://calling${REGION_PATTERN}.api.sinch.com`;
export const VOICE_APPLICATION_MANAGEMENT_HOSTNAME = 'https://callingapi.sinch.com';

export const formatRegionalizedHostname = (hostnamePattern: string, region: string) => {
  return hostnamePattern.replace(REGION_PATTERN, region);
};
