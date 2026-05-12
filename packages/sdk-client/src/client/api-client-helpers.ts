import {
  RequestOptions,
  RequestPlugin,
  RequestPluginEnum,
} from '../plugins/core/request-plugin';
import { ApiCallParameters, ApiCallParametersWithPagination } from '../api/api-client';
import { ErrorContext, GenericError } from '../api/api-errors';
import { Oauth2TokenRequest } from '../plugins';

/**
 * Clear the cached JWT (race-safely — only if the cache still holds the
 * failing one) and re-run the OAuth2 plugin to obtain a fresh token, returning
 * updated request options for a single retry.
 */
export const manageExpiredToken = async (
  apiCallParameters: ApiCallParameters | ApiCallParametersWithPagination,
  errorContext: ErrorContext,
  requestPlugins: RequestPlugin[] | undefined,
  failingJwt?: string,
): Promise<RequestOptions> => {
  const oauth2Plugin = requestPlugins?.find(
    (plugin) => plugin.getName() === RequestPluginEnum.OAUTH2_TOKEN_REQUEST,
  );
  if (!oauth2Plugin) {
    throw new GenericError(
      'Trying to clear an expired JWT from the cache while the Oauth2Token plugin is not registered to the API client',
      errorContext,
    );
  }
  (oauth2Plugin as Oauth2TokenRequest).clearCachedToken(failingJwt);
  return oauth2Plugin.load().transform(apiCallParameters.requestOptions);
};

export function buildErrorContext(
  apiCallParameters: ApiCallParameters,
): ErrorContext {
  return {
    apiName: apiCallParameters.apiName,
    operationId: apiCallParameters.operationId,
    url: apiCallParameters.url,
  };
}

/**
 * Go through all an object's properties and transform to date the values that match the right format
 * @param {any} input - the response object after all the response plugins have been run
 * @return {any} - the response where the values matching a date are revived as Date objects
 */
export const reviveDates = (input: any): any => {
  if (Array.isArray(input)) {
    // Process array elements recursively
    return input.map((item) => reviveDates(item));
  } else if (typeof input === 'object' && input !== null) {
    // Process object properties recursively
    const newObj: any = {};
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        newObj[key] = reviveDates(input[key]);
      }
    }
    return newObj;
  } else if (isDateString(input)) {
    // Convert string date to Date object
    return new Date(addTimezoneIfMissing(input));
  } else {
    // Return other types as-is
    return input;
  }
};

const isDateString = (value: any): boolean => {
  if (typeof value === 'string' && value.length >= 10) {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value.slice(0,10);
  }
  return false;
};

const addTimezoneIfMissing = (timestampValue: string): string => {
  // Check the formats +XX:XX, +XX, +XXXX and Z
  const timeZoneRegex = /([+-]\d{2}(:\d{2})|[+-]\d{4}|Z)$/;
  if (!timeZoneRegex.test(timestampValue)) {
    const hourMinutesTimezoneRegex = /([+-]\d{2})$/;
    // A timestamp with no minutes in the timezone cannot be converted into a Date => assume it's :00
    if (hourMinutesTimezoneRegex.test(timestampValue)) {
      timestampValue = timestampValue + ':00';
    } else {
      timestampValue = timestampValue + 'Z';
    }
  }
  return timestampValue;
};
