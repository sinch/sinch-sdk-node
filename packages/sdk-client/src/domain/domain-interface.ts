import { RequestPlugin } from '../plugins/core/request-plugin';
import { ResponsePlugin } from '../plugins/core/response-plugin';

/**
 * Global object that holds the API configuration.
 * Be careful to follow the guidelines defined by the API Services about which parameters are required for each API. Not all of them use the same authentication mechanism:
 *  - OAuth2: Conversation, Fax, Numbers and SMS (US and EU regions only)
 *  - API Token: SMS on all regions
 *  - Application Signed: Verification and Voice
 */
export type SinchClientParameters = Partial<
  UnifiedCredentials
  & MailgunCredentials
  & ServicePlanIdCredentials
  & ApplicationCredentials
  & ApiHostname
  & ApiPlugins>;

export interface UnifiedCredentials {
  /** The project ID associated with the API Client. You can find this on your [Dashboard](https://dashboard.sinch.com/account/access-keys). */
  projectId: string;
  /** The client ID used for authentication. You can find this on your [Dashboard](https://dashboard.sinch.com/account/access-keys). */
  keyId: string;
  /** The client secret used for authentication. You can find this ONLY when creating a new key. */
  keySecret: string;
  /** The region for the SMS API. Default region is US */
  smsRegion?: SmsRegion;
  /** @deprecated boolean to force the usage of the OAuth2 authentication for the SMS API - to be used when a region other of US and EU supports OAuth2 but the SDK doesn't by default */
  forceOAuth2ForSmsApi?: boolean;
  /** The region for the Fax API. Default is auto-routing */
  faxRegion?: FaxRegion;
  /** The region for the Conversation API. Default region is US */
  conversationRegion?: ConversationRegion;
}

export interface MailgunCredentials {
  /** Your API Key created from the [Mailgun Dashboard](https://app.mailgun.com/settings/api_security) */
  mailgunApiKey: string;
  /** The region for the Mailgun API. Default region is empty and targets the US endpoint */
  mailgunRegion?: string;
}

export interface ServicePlanIdCredentials {
  /** Your service plan ID. You can find this on your [Dashboard](https://dashboard.sinch.com/sms/api/rest). */
  servicePlanId: string;
  /** Your API token. You can find this on your [Dashboard](https://dashboard.sinch.com/sms/api/rest). */
  apiToken: string;
  /** @deprecated boolean to force the usage of the service plan Id + API token as credentials for the SMS API */
  forceServicePlanIdUsageForSmsApi?: boolean;
  /** The region for the SMS API. Default region is US */
  smsRegion?: SmsRegion;
}

export interface ApplicationCredentials {
  /** Your Application key. You can find this on your [Dashboard](https://dashboard.sinch.com/verification/apps)*/
  applicationKey: string;
  /** Your Application secret. You can find this on your [Dashboard](https://dashboard.sinch.com/verification/apps)*/
  applicationSecret: string;
  /** The region for the Voice API. Default is empty */
  voiceRegion?: VoiceRegion;
}

export interface ApiHostname {
  /** Override the hostname for the OAuth2 authentication API */
  authHostname?: string;
  /** Override the hostname for the Conversation API (not Conversation Templates) - Note the regions become ineffective */
  conversationHostname?: string;
  /** Override the hostname for the Conversation Templates API - Note the regions become ineffective */
  conversationTemplatesHostname?: string;
  /** Override the hostname for the Elastic SIP Trunking API */
  elasticSipTrunkingHostname?: string;
  /** Override the hostname for the Fax API - Note the regions become ineffective */
  faxHostname?: string;
  /** Override the hostname for the Mailgun API - Note the regions become ineffective */
  mailgunHostname?: string;
  /** Override the hostname for the Numbers API */
  numbersHostname?: string;
  /** Override the hostname for the SMS API - Note the regions become ineffective */
  smsHostname?: string;
  /** Override the hostname for the Verification API */
  verificationHostname?: string;
  /** Override the hostname for the Voice API (not Voice Application Management) - Note the regions become ineffective */
  voiceHostname?: string;
  /** Override the hostname for the Voice Application Management API */
  voiceApplicationManagementHostname?: string;
}

export interface ApiPlugins {
  /** Add more plugins to action on the request before it is sent */
  requestPlugins?: RequestPlugin[];
  /** Add more plugins to action on the server response before it is returned in the Promise */
  responsePlugins?: ResponsePlugin<any>[];
}

export const isUnifiedCredentials = (credentials: any): credentials is UnifiedCredentials => {
  const candidate = (credentials) as UnifiedCredentials;
  return candidate.projectId !== undefined
    && candidate.keyId !== undefined
    && candidate.keySecret !== undefined;
};

export const isServicePlanIdCredentials = (credentials: any): credentials is ServicePlanIdCredentials => {
  const candidate = (credentials) as ServicePlanIdCredentials;
  return candidate.servicePlanId !== undefined
    && candidate.apiToken !== undefined;
};

// /////////////
// SMS regions
export enum SupportedSmsRegion {
  UNITED_STATES = 'us',
  EUROPE = 'eu',
  BRAZIL = 'br',
  CANADA = 'ca',
  AUSTRALIA = 'au'
}

export type SmsRegion = SupportedSmsRegion | string;

export const SmsRegion = {
  ...SupportedSmsRegion,
};

// /////////////
// Voice regions
export enum SupportedVoiceRegion {
  DEFAULT = '',
  UNITED_STATES = 'use1',
  EUROPE = 'euc1',
  SOUTH_AMERICA = 'sae1',
  SOUTHEAST_ASIA_1 = 'apse1',
  SOUTHEAST_ASIA_2 = 'apse2'
}

export type VoiceRegion = SupportedVoiceRegion | string;

export const VoiceRegion = {
  ...SupportedVoiceRegion,
};

// ///////////
// Fax regions
export enum SupportedFaxRegion {
  DEFAULT = '',
  UNITED_STATES = 'use1',
  EUROPE = 'eu1',
  SOUTH_AMERICA = 'sae1',
  SOUTHEAST_ASIA_1 = 'apse1',
  SOUTHEAST_ASIA_2 = 'apse2'
}

export type FaxRegion = SupportedFaxRegion | string;

export const FaxRegion = {
  ...SupportedFaxRegion,
};

// ////////////////////
// Conversation regions
export enum SupportedConversationRegion {
  UNITED_STATES = 'us',
  EUROPE = 'eu',
  BRAZIL = 'br'
}

export type ConversationRegion = SupportedConversationRegion | string;

export const ConversationRegion = {
  ...SupportedConversationRegion,
};

// ////////////////////
// Mailgun regions
export enum SupportedMailgunRegion {
  DEFAULT = '',
  EUROPE = 'eu',
}

export type MailgunRegion = SupportedMailgunRegion | string;

export const MailgunRegion = {
  ...SupportedMailgunRegion,
};

export enum SupportedMailgunStorageRegion {
  US,
  EUROPE
}

export type MailgunStorageRegion = SupportedMailgunStorageRegion | string;

export const MailgunStorageRegion = {
  ...SupportedMailgunStorageRegion,
};
