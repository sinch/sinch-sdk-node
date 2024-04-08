import { RequestPlugin } from '../plugins/core/request-plugin';
import { ResponsePlugin } from '../plugins/core/response-plugin';

export interface SinchClientParameters extends
  Partial<UnifiedCredentials>,
  Partial<ServicePlanIdCredentials>,
  Partial<ApplicationCredentials>,
  ApiHostname,
  ApiPlugins {}

export interface UnifiedCredentials {
  /** The project ID associated with the API Client. You can find this on your [Dashboard](https://dashboard.sinch.com/account/access-keys). */
  projectId: string;
  /** The client ID used for authentication. You can find this on your [Dashboard](https://dashboard.sinch.com/account/access-keys). */
  keyId: string;
  /** The client secret used for authentication. You can find this ONLY when creating a new key. */
  keySecret: string;
  /** The region for the SMS API. Default region is US */
  smsRegion?: SmsRegion;
  /** boolean to force the usage of the OAuth2 authentication for the SMS API - to be used when a region other of US and EU supports OAuth2 but the SDK doesn't by default */
  forceOAuth2ForSmsApi?: boolean;
  /** The region for the Fax API. Default is auto-routing */
  faxRegion?: FaxRegion;
  /** The region for the Conversation API. Default region is US */
  conversationRegion?: ConversationRegion;
}

export interface ServicePlanIdCredentials {
  /** Your service plan ID. You can find this on your [Dashboard](https://dashboard.sinch.com/sms/api/rest). */
  servicePlanId: string;
  /** Your API token. You can find this on your [Dashboard](https://dashboard.sinch.com/sms/api/rest). */
  apiToken: string;
  /** boolean to force the usage of the service plan Id + API token as credentials for the SMS API */
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
  authHostname?: string;
  conversationHostname?: string;
  conversationTemplatesHostname?: string;
  faxHostname?: string;
  numbersHostname?: string;
  smsHostname?: string;
  verificationHostname?: string;
  voiceHostname?: string;
  voiceApplicationManagementHostname?: string;
}

export interface ApiPlugins {
  requestPlugins?: RequestPlugin[];
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
