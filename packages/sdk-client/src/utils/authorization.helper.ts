import crypto from 'crypto';
import { IncomingHttpHeaders } from 'http';
import { RequestBody } from '../plugins';

export const calculateMD5 = (body: string): string => {
  // Content-MD5 = Base64 ( MD5 ( UTF8 ( [BODY] ) ) )
  return crypto.createHash('md5').update(Buffer.from(body, 'utf-8')).digest('base64');
};

export const calculateSignature = (secret: string, stringToSign: string): string => {
  // Signature = Base64 ( HMAC-SHA256 ( Base64-Decode ( ApplicationSecret ), UTF8 ( StringToSign ) ) );
  return crypto.createHmac('sha256', Buffer.from(secret, 'base64'))
    .update(Buffer.from(stringToSign, 'utf-8'))
    .digest('base64');
};

const buildStringToSign = (
  httpVerb: string,
  contentMD5: string,
  contentType: string,
  canonicalizedHeaders: string,
  canonicalizedResource: string,
): string => {
  return `${httpVerb}\n${contentMD5}\n${contentType}\n${canonicalizedHeaders}\n${canonicalizedResource}`;
};

export const generateAuthorizationHeader = (
  httpVerb: string,
  body: RequestBody | undefined,
  contentType: string,
  canonicalizedHeaders: string,
  canonicalizedResource: string,
  applicationKey: string,
  applicationSecret: string,
): string => {
  const hasBody = !!body;
  const stringToSign = buildStringToSign(
    httpVerb,
    hasBody ? calculateMD5(body as string) : '',
    contentType,
    canonicalizedHeaders,
    canonicalizedResource,
  );

  const signature = calculateSignature(applicationSecret, stringToSign);
  return `Application ${applicationKey}:${signature}`;
};

export const validateAuthenticationHeader = (
  applicationKey: string,
  applicationSecret: string,
  headers: IncomingHttpHeaders,
  path: string,
  body: any,
  method: string,
): boolean => {
  const normalizedHeaders = Object.fromEntries(
    Object.entries(headers)
      .map(([key, value]) => [key.toLowerCase(), value])
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value !== undefined),
  ) as { [p: string]: string | string[] };

  const authorization = getHeader(normalizedHeaders.authorization);
  const authParts = checkAuthorizationHeaderFormat(authorization);

  const authorizationScheme = authParts[0].toLowerCase();
  const authorizationValue = authParts[1];
  if (authorizationScheme === 'basic') {
    return validateBasicAuth(authorizationValue, applicationKey, applicationSecret);
  }
  if (authorizationScheme === 'application') {
    return validateApplicationAuth(
      authorizationValue,
      normalizedHeaders,
      applicationKey,
      applicationSecret,
      path,
      body,
      method,
    );
  }
  // Other schemes than 'basic' or 'application' are not supported
  throw new Error(`Scheme is not valid: ${authParts[0]}`);
};

const validateApplicationAuth = (
  authorizationValue: string,
  normalizedHeaders: {[p: string]: string | string[]},
  applicationKey: string,
  applicationSecret: string,
  path: string,
  body: any,
  method: string,
): boolean => {
  const authKeyAndSecret = authorizationValue.split(':');
  if(authKeyAndSecret.length !== 2) {
    throw new Error('Invalid authorization value format provided');
  }
  if(authKeyAndSecret[0] !== applicationKey) {
    throw new Error('Application Key is not valid');
  }

  const contentType = getHeader(normalizedHeaders['content-type']);
  const hasBody = !!body;
  const contentMD5 = hasBody ? calculateMD5(body) : '';
  const stringToSign = buildStringToSign(
    method.toUpperCase(),
    contentMD5,
    contentType,
    `x-timestamp:${normalizedHeaders['x-timestamp']}`,
    path,
  );
  const signature = calculateSignature(applicationSecret, stringToSign);

  if(authKeyAndSecret[1] !== signature) {
    throw new Error('Invalid signature');
  }

  return true;
};

const checkAuthorizationHeaderFormat = (authorizationHeader: string) => {
  const authParts = authorizationHeader.split(' ');
  if(authParts.length !== 2) {
    // The authorization header must be in 2 part: scheme and authorization value
    throw new Error('Invalid authorization format provided');
  }
  return authParts;
};

const validateBasicAuth = (
  authorization: string,
  applicationKey: string,
  applicationSecret: string,
): boolean => {
  const authKeyAndSecret = authorization.split(':');
  if(authKeyAndSecret.length !== 2) {
    throw new Error('Invalid authorization value format provided');
  }
  if(authKeyAndSecret[0] !== applicationKey || authKeyAndSecret[1] !== applicationSecret) {
    throw new Error('Invalid credentials provided');
  }
  return true;
};

const getHeader = (headerValue: string | string[]) => {
  return Array.isArray(headerValue)
    ? headerValue[0]
    : headerValue;
};
