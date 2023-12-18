import {
  Oauth2TokenRequest,
  RequestOptions,
  RequestPlugin,
} from '../plugins';
import { ApiCallParameters, ApiCallParametersWithPagination, ErrorContext, GenericError } from '../api';

export const manageExpiredToken = async (
  apiCallParameters: ApiCallParameters | ApiCallParametersWithPagination,
  errorContext: ErrorContext,
  requestPlugins: RequestPlugin[] | undefined,
  requestOptions: RequestOptions,
  callback: (props: any) => Promise<any>,
) => {
  // Use the circuitBreaker variable to try to regenerate a valid JWT only 3 times
  if (!apiCallParameters.circuitBreaker) {
    apiCallParameters.circuitBreaker = 1;
  } else {
    apiCallParameters.circuitBreaker++;
    // Check the circuitBreaker value: if greater than 3, then we stop and throw
    if (apiCallParameters.circuitBreaker >= 3) {
      throw new GenericError(
        'Tried to generate a new JWT with no success',
        errorContext,
      );
    }
  }
  const optionsWithNewJwt = await invalidateAndRegenerateJwt(requestPlugins, requestOptions, errorContext);
  const newApiCallParameters = {
    ...apiCallParameters,
    requestOptions: optionsWithNewJwt,
  };
  return callback(newApiCallParameters);
};

export function buildErrorContext(
  apiCallParameters: ApiCallParameters,
  origin: string | null,
): ErrorContext {
  return {
    apiName: apiCallParameters.apiName,
    operationId: apiCallParameters.operationId,
    url: apiCallParameters.url,
    origin,
  };
}

export async function invalidateAndRegenerateJwt(
  requestPlugins: RequestPlugin[] | undefined,
  options: RequestOptions,
  errorContext: ErrorContext,
): Promise<RequestOptions> {
  const oauth2Plugin = requestPlugins?.find(
    (plugin) => plugin instanceof Oauth2TokenRequest,
  ) as Oauth2TokenRequest;
  if (oauth2Plugin) {
    oauth2Plugin.invalidateToken();
    return oauth2Plugin.load().transform(options);
  } else {
    const errorMessage
      = 'Trying to invalidate an expired JWT while the Oauth2Token plugin is not registered to the API client';
    throw new GenericError(errorMessage, errorContext);
  }
}
