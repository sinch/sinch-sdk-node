import {
  ApiPlugins,
  MailgunCredentials,
  resolveTimeoutSeconds,
  SinchClientParameters,
  TransportSettings,
  WithLogger,
  WithRetryPolicy,
} from '../domain';
import { ApiClientOptions } from './api-client-options';
import {
  ApiTokenRequest,
  BasicAuthenticationRequest,
  Oauth2TokenRequest,
  SigningRequest,
  XTimestampRequest,
} from '../plugins';
import { RequestPlugin } from '../plugins/core/request-plugin';
import { resolveLogger } from '../logger';
import { resolveRetryConfig } from '../client/retry-policy';
import type { Logger } from '../logger';

const resolveParamsLogger = (params: SinchClientParameters) => resolveLogger(params.logger);

const applyRetryConfig = (
  apiClientOptions: ApiClientOptions,
  params: WithRetryPolicy,
): void => {
  const retry = resolveRetryConfig(params);
  apiClientOptions.retryPolicy = retry.retryPolicy;
  apiClientOptions.maxRetryCount = retry.maxRetryCount;
  apiClientOptions.exponentialBackoff = retry.exponentialBackoff;
};

const getAuthPlugins = (
  params: SinchClientParameters,
  logger: Logger,
  timeoutSeconds: number,
): RequestPlugin[] => {
  if (!(params.useSinchAuth ?? true)) {
    return [];
  }
  return [
    new Oauth2TokenRequest(
      params.keyId!,
      params.keySecret!,
      params.authHostname,
      logger,
      timeoutSeconds,
      params,
    ),
  ];
};

const assertOAuth2Credentials = (params: SinchClientParameters, apiName: string): void => {
  const useSinchAuth = params.useSinchAuth ?? true;
  if (!params.projectId || (useSinchAuth && (!params.keyId || !params.keySecret))) {
    throw new Error(
      useSinchAuth
        ? `Invalid configuration for the ${apiName} API: "projectId", "keyId" and "keySecret" values must be provided`
        : `Invalid configuration for the ${apiName} API: "projectId" must be provided`,
    );
  }
};

/** @internal */
export const buildOAuth2ApiClientOptions = (params: SinchClientParameters, apiName: string): ApiClientOptions => {
  assertOAuth2Credentials(params, apiName);
  const logger = resolveParamsLogger(params);
  const timeoutSeconds = resolveTimeoutSeconds(params.timeoutSeconds);
  const apiClientOptions: ApiClientOptions = {
    projectId: params.projectId,
    requestPlugins: getAuthPlugins(params, logger, timeoutSeconds),
    useServicePlanId: false,
    logger,
    timeoutSeconds,
  };
  applyRetryConfig(apiClientOptions, params);
  addPlugins(apiClientOptions, params);
  return apiClientOptions;
};

/** @internal @deprecated */
export const buildMailgunApiClientOptions = (
  params: Partial<MailgunCredentials & ApiPlugins & WithLogger & WithRetryPolicy & TransportSettings>,
): ApiClientOptions => {
  if (!params.mailgunApiKey) {
    throw new Error('Invalid configuration for the Mailgun API: the "mailgunApiKey" must be provided');
  }
  const logger = resolveParamsLogger(params);
  const apiClientOptions: ApiClientOptions = {
    requestPlugins: [
      new BasicAuthenticationRequest('api', params.mailgunApiKey),
    ],
    logger,
    timeoutSeconds: resolveTimeoutSeconds(params.timeoutSeconds),
  };
  applyRetryConfig(apiClientOptions, params);
  addPlugins(apiClientOptions, params);
  return apiClientOptions;
};

/** @internal */
export const buildApplicationSignedApiClientOptions = (
  params: SinchClientParameters, apiName: string,
): ApiClientOptions => {
  if (!params.applicationKey || !params.applicationSecret) {
    throw new Error(`Invalid configuration for the ${apiName} API: "applicationKey" and "applicationSecret" values must be provided`);
  }
  const logger = resolveParamsLogger(params);
  const apiClientOptions: ApiClientOptions = {
    requestPlugins: [
      new XTimestampRequest(),
      new SigningRequest(params.applicationKey, params.applicationSecret),
    ],
    logger,
    timeoutSeconds: resolveTimeoutSeconds(params.timeoutSeconds),
  };
  applyRetryConfig(apiClientOptions, params);
  addPlugins(apiClientOptions, params);
  return apiClientOptions;
};

/** @internal */
export const buildFlexibleOAuth2OrApiTokenApiClientOptions = (params: SinchClientParameters): ApiClientOptions => {
  const logger = resolveParamsLogger(params);
  const timeoutSeconds = resolveTimeoutSeconds(params.timeoutSeconds);
  const useSinchAuth = params.useSinchAuth ?? true;
  let apiClientOptions: ApiClientOptions | undefined;

  if (params.servicePlanId && params.apiToken) {
    apiClientOptions = {
      projectId: params.servicePlanId,
      requestPlugins: [new ApiTokenRequest(params.apiToken)],
      useServicePlanId: true,
      logger,
      timeoutSeconds,
    };
    if (params.projectId || params.keyId || params.keySecret) {
      logger.warn(
        'As the servicePlanId and the apiToken are provided, all other credentials will be disregarded.');
    }
  } else if (params.projectId && (!useSinchAuth || (params.keyId && params.keySecret))) {
    apiClientOptions = {
      projectId: params.projectId,
      requestPlugins: getAuthPlugins(params, logger, timeoutSeconds),
      useServicePlanId: false,
      logger,
      timeoutSeconds,
    };
  }
  if (!apiClientOptions) {
    throw new Error('Invalid parameters for the SMS API: check your configuration');
  }
  applyRetryConfig(apiClientOptions, params);
  addPlugins(apiClientOptions, params);
  return apiClientOptions;
};

const addPlugins = (apiClientOptions: ApiClientOptions, params: SinchClientParameters) => {
  if (params.requestPlugins && params.requestPlugins.length > 0) {
    if (!apiClientOptions.requestPlugins) {
      apiClientOptions.requestPlugins = [];
    }
    apiClientOptions.requestPlugins.push(...params.requestPlugins);
  }
  if (params.responsePlugins && params.responsePlugins.length > 0) {
    if (!apiClientOptions.responsePlugins) {
      apiClientOptions.responsePlugins = [];
    }
    apiClientOptions.responsePlugins.push(...params.responsePlugins);
  }
  return apiClientOptions;
};
