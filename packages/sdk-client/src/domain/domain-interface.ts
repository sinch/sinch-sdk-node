import { RequestPlugin } from '../plugins/core/request-plugin';
import { ResponsePlugin } from '../plugins/core/response-plugin';

export interface SinchClientParameters extends
  Partial<UnifiedCredentials>,
  Partial<ServicePlanIdCredentials>,
  Partial<ApplicationCredentials>,
  Partial<ApiBaseUrl>,
  Partial<Plugins> {}

export interface UnifiedCredentials {
  /** The project ID associated with the API Client. You can find this on your [Dashboard](https://dashboard.sinch.com/account/access-keys). */
  projectId: string;
  /** The client ID used for authentication. You can find this on your [Dashboard](https://dashboard.sinch.com/account/access-keys). */
  keyId: string;
  /** The client secret used for authentication. You can find this ONLY when creating a new key. */
  keySecret: string;
  /** The region for the SMS API. Default region is US */
  region?: Region;
}

export interface ServicePlanIdCredentials {
  /** Your service plan ID. You can find this on your [Dashboard](https://dashboard.sinch.com/sms/api/rest). */
  servicePlanId: string;
  /** Your API token. You can find this on your [Dashboard](https://dashboard.sinch.com/sms/api/rest). */
  apiToken: string;
  /** boolean to force the usage of the service plan Id + API token as credentials for the SMS API*/
  forceServicePlanIdUsageForSmsApi?: boolean;
  /** The region for the SMS API. Default region is US */
  region?: Region;
}

export interface ApplicationCredentials {
  /** Your Application key. You can find this on your [Dashboard](https://dashboard.sinch.com/verification/apps)*/
  applicationKey: string;
  /** Your Application secret. You can find this on your [Dashboard](https://dashboard.sinch.com/verification/apps)*/
  applicationSecret: string;
  /** The region for the Voice API. Default is empty */
  voiceRegion?: VoiceRegion;
}

export interface ApiBaseUrl {
  authBaseUrl?: string;
  numbersBaseUrl?: string;
  smsBaseUrl?: string;
}

export interface Plugins {
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

export enum Region {
  UNITED_STATES = 'us',
  EUROPE = 'eu',
  BRAZIL = 'br',
  CANADA = 'ca',
  AUSTRALIA = 'au'
}

export function getRegion(value: string | undefined): Region | undefined {
  if (!value) {
    return undefined;
  }

  for (const region of Object.values(Region)) {
    if (region === value.toLowerCase()) {
      return region as Region;
    }
  }
  console.error(`No region exist for the value '${value}'`);
  return undefined;
}

export enum VoiceRegion {
  DEFAULT = '',
  UNITED_STATES = '-use1',
  EUROPE = '-euc1',
  SOUTH_AMERICA = '-sae1',
  SOUTHEAST_ASIA_1 = '-apse1',
  SOUTHEAST_ASIA_2 = '-apse2'
}

export enum ConversationRegion {
  UNITED_STATES = 'us',
  EUROPE = 'eu',
  BRAZIL = 'br'
}

export const getVoiceRegion = (value: string | undefined): VoiceRegion | undefined => {
  if (!value) {
    return undefined;
  }
  for(const region of Object.values(VoiceRegion)) {
    if (region === value.toLowerCase())  {
      return region as VoiceRegion;
    }
  }
  console.error(`No region exist for the value '${value}'`);
  return undefined;
};
