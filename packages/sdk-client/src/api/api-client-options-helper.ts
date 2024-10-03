import { SinchClientParameters } from '../domain';
import { ApiClientOptions } from './api-client-options';
import {
  ApiTokenRequest,
  Oauth2TokenRequest,
  SigningRequest,
  XTimestampRequest,
} from '../plugins';

export const buildOAuth2ApiClientOptions = (params: SinchClientParameters, apiName: string): ApiClientOptions => {
  if (!params.projectId || !params.keyId || !params.keySecret) {
    throw new Error(`Invalid configuration for the ${apiName} API: "projectId", "keyId" and "keySecret" values must be provided`);
  }
  const apiClientOptions: ApiClientOptions = {
    projectId: params.projectId,
    requestPlugins: [new Oauth2TokenRequest(params.keyId, params.keySecret, params.authHostname)],
    useServicePlanId: false,
  };
  addPlugins(apiClientOptions, params);
  return apiClientOptions;
};

export const buildApplicationSignedApiClientOptions = (
  params: SinchClientParameters, apiName: string,
): ApiClientOptions => {
  if (!params.applicationKey || !params.applicationSecret) {
    throw new Error(`Invalid configuration for the ${apiName} API: "applicationKey" and "applicationSecret" values must be provided`);
  }
  const apiClientOptions: ApiClientOptions = {
    requestPlugins: [
      new XTimestampRequest(),
      new SigningRequest(params.applicationKey, params.applicationSecret),
    ],
  };
  addPlugins(apiClientOptions, params);
  return apiClientOptions;
};

export const buildFlexibleOAuth2OrApiTokenApiClientOptions = (params: SinchClientParameters): ApiClientOptions => {
  let apiClientOptions: ApiClientOptions | undefined;

  if (params.servicePlanId && params.apiToken) {
    apiClientOptions = {
      projectId: params.servicePlanId,
      requestPlugins: [new ApiTokenRequest(params.apiToken)],
      useServicePlanId: true,
    };
    if (params.projectId || params.keyId || params.keySecret) {
      console.warn('As the servicePlanId and the apiToken are provided, all other credentials will be disregarded.');
    }
  } else if (params.projectId && params.keyId && params.keySecret) {
    apiClientOptions = {
      projectId: params.projectId,
      requestPlugins: [new Oauth2TokenRequest(params.keyId, params.keySecret, params.authHostname)],
      useServicePlanId: false,
    };
  }
  if (!apiClientOptions) {
    throw new Error('Invalid parameters for the SMS API: check your configuration');
  }
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
