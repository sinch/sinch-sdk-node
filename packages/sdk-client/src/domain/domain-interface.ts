import { RequestPlugin } from '../plugins/core/request-plugin';
import { ResponsePlugin } from '../plugins/core/response-plugin';
import { Logger } from '../logger';

/**
 * Global object that holds the API configuration.
 * Be careful to follow the guidelines defined by the API Services about which parameters are required for each API. Not all of them use the same authentication mechanism:
 *  - OAuth2: Conversation, Fax, Numbers and SMS (US and EU regions only)
 *  - API Token: SMS on all regions
 *  - Application Signed: Verification and Voice
 *
 * Optional cross-cutting settings include `logger` ({@link WithLogger}),
 * retry tuning via `retryPolicy`, `maxRetryCount`, and `exponentialBackoff`
 * ({@link WithRetryPolicy}), and transport settings ({@link TransportSettings}).
 */
export type SinchClientParameters = Partial<
  UnifiedCredentials
  & ServicePlanIdCredentials
  & ApplicationCredentials
  & ApiHostname
  & ApiPlugins
  & WithLogger
  & WithRetryPolicy
  & TransportSettings>;

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
  /** @deprecated - not in use anymore. */
  faxRegion?: FaxRegion;
  /** The region for the Conversation API. Default region is US */
  conversationRegion?: ConversationRegion;
}

/** @internal @deprecated */
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
  /** Override the hostname for the Fax API */
  faxHostname?: string;
  /** @deprecated Mailgun was never released as a Node SDK product. */
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
  /** Override the hostname for the Number Lookup API */
  numberLookupHostname?: string;
  /** Override the hostname for the Provisioning API */
  provisioningHostname?: string;
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
/** @deprecated */
export enum SupportedFaxRegion {
  DEFAULT = '',
  UNITED_STATES = 'use1',
  EUROPE = 'eu1',
  SOUTH_AMERICA = 'sae1',
  SOUTHEAST_ASIA_1 = 'apse1',
  SOUTHEAST_ASIA_2 = 'apse2'
}

/** @deprecated */
export type FaxRegion = SupportedFaxRegion | string;

/** @deprecated */
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
/** @internal @deprecated Mailgun was never released as a Node SDK product. */
export enum SupportedMailgunRegion {
  DEFAULT = '',
  EUROPE = 'eu',
}

/** @internal @deprecated Mailgun was never released as a Node SDK product. */
export type MailgunRegion = SupportedMailgunRegion | string;

/** @internal @deprecated Mailgun was never released as a Node SDK product. */
export const MailgunRegion = {
  ...SupportedMailgunRegion,
};

export interface WithLogger {
  /**
   * Logger instance to be used by the SDK.
   * - omitted or `undefined`: defaults to `console`
   * - `null`: silent (no SDK output)
   */
  logger?: Logger | null;
}

/**
 * Policy used when the SDK retries a failed HTTP call.
 * - `DEFAULT`: honor `Retry-After` when present, otherwise exponential backoff
 * - `RETRY_AFTER`: only retry when a usable `Retry-After` header is present
 * - `BACKOFF`: ignore `Retry-After`; use full-jitter exponential backoff only
 * - `NONE`: disable automatic retries
 */
export enum SupportedRetryPolicy {
  DEFAULT = 'DEFAULT',
  RETRY_AFTER = 'RETRY_AFTER',
  BACKOFF = 'BACKOFF',
  NONE = 'NONE',
}

export type RetryPolicy = SupportedRetryPolicy;

export const RetryPolicy = {
  ...SupportedRetryPolicy,
};

/**
 * Tunable retry settings applied to all SDK HTTP calls (OAuth and product APIs).
 * Defaults: `retryPolicy=DEFAULT`, `maxRetryCount=3`, `exponentialBackoff=4`.
 */
export interface WithRetryPolicy {
  /**
   * How the SDK should retry eligible failed HTTP responses.
   * @default RetryPolicy.DEFAULT
   */
  retryPolicy?: RetryPolicy;
  /**
   * Maximum number of retries after the first attempt before the error is surfaced to the caller.
   * @default 3
   */
  maxRetryCount?: number;
  /**
   * Growth factor for the full-jitter exponential backoff ceiling
   * (`1000ms * exponentialBackoff^attempt`).
   * @default 4
   */
  exponentialBackoff?: number;
}

/** Default HTTP I/O timeout in seconds when `timeoutSeconds` is omitted. */
export const DEFAULT_TIMEOUT_SECONDS = 60;

/**
 * Resolve `timeoutSeconds`, defaulting to {@link DEFAULT_TIMEOUT_SECONDS}.
 * `0` disables the timeout.
 * @internal
 */
export const resolveTimeoutSeconds = (timeoutSeconds?: number): number => {
  const value = timeoutSeconds ?? DEFAULT_TIMEOUT_SECONDS;
  if (!Number.isFinite(value) || value < 0) {
    throw new Error('Invalid configuration: "timeoutSeconds" must be a non-negative number');
  }
  return value;
};

/**
 * Transport-level settings shared by SinchClient and (later) request-level options.
 */
export interface TransportSettings {
  /**
   * When true (default), OAuth-capable APIs authenticate against Sinch auth.
   * Set false to skip Sinch OAuth (e.g. custom Authorization via requestPlugins).
   * When false, OAuth-capable APIs require only `projectId`.
   */
  useSinchAuth?: boolean;
  /**
   * Request/connection timeout in seconds for HTTP I/O. Default: 60.
   * Pass 0 to disable the timeout.
   */
  timeoutSeconds?: number;
}

/** Sinch client parameters with resolved logger and transport defaults. */
export type ResolvedSinchClientParameters = Omit<
  SinchClientParameters,
  'logger' | 'useSinchAuth' | 'timeoutSeconds'
> & {
  logger: Logger;
  useSinchAuth: boolean;
  timeoutSeconds: number;
};
