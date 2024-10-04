import {
  RequestOptions,
  RequestPlugin,
  RequestPluginEnum,
} from '../plugins/core/request-plugin';
import { ApiCallParameters, ApiCallParametersWithPagination } from '../api/api-client';
import { ErrorContext, GenericError } from '../api/api-errors';

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
    (plugin) => plugin.getName() === RequestPluginEnum.OAUTH2_TOKEN_REQUEST,
  );
  if (oauth2Plugin) {
    (oauth2Plugin as any).invalidateToken();
    return oauth2Plugin.load().transform(options);
  } else {
    const errorMessage
      = 'Trying to invalidate an expired JWT while the Oauth2Token plugin is not registered to the API client';
    throw new GenericError(errorMessage, errorContext);
  }
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
