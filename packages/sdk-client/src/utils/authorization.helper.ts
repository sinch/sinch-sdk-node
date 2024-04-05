import crypto from 'crypto';
import { IncomingHttpHeaders } from 'http';
import { RequestBody } from '../plugins/core/request-plugin';
import * as console from 'console';

/**
 * Generate authorization header for application-signed requests (Verification and Voice)
 * @param {string} httpVerb - request's HTTP method
 * @param {RequestBody | undefined} body - request's body (undefined in case of GET request)
 * @param {string} contentType - content-type header value
 * @param {string} canonicalizedHeaders - x-timestamp header
 * @param {string} canonicalizedResource - request's path
 * @param {string} applicationKey - application key (from dashboard)
 * @param {string} applicationSecret - application secret (from dashboard)
 * @return {string} - Application signed header value for HTTP authorization header
 */
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

/**
 * Validate webhook signature headers for Conversation callback.
 * @param {string} secret - secret associated to the Conversation app
 * @param {IncomingHttpHeaders} headers - Incoming request's headers
 * @param {any} body - Incoming request's body
 * @return {boolean} - true if the signature header is valid
 */
export const validateWebhookSignature = (
  secret: string,
  headers: IncomingHttpHeaders,
  body: any,
): boolean => {
  const normalizedHeaders = normalizeHeaders(headers);
  const nonce = getHeader(normalizedHeaders['x-sinch-webhook-signature-nonce']);
  const timestamp = getHeader(normalizedHeaders['x-sinch-webhook-signature-timestamp']);

  let bodyAsString = body;
  if (typeof body === 'object' && body !== null) {
    bodyAsString = JSON.stringify(body);
  }

  const signedData = computeSignedData(bodyAsString, nonce, timestamp);
  const signature = calculateWebhookSignature(signedData, secret);

  const headerSignature = normalizedHeaders['x-sinch-webhook-signature'];

  return headerSignature === signature;
};

/**
 * Validate authorization header for callback request on application-signed protected endpoints (Verification and Voice webhooks)
 * @param {string} applicationKey - application key (from dashboard) related to the event
 * @param {string} applicationSecret - application secret (from dashboard) related to the event
 * @param {IncomingHttpHeaders} headers - Incoming request's headers
 * @param {any} body - Incoming request's body
 * @param {string} path - Incoming request's path
 * @param {string} method - Incoming request's HTTP method
 * @return {boolean} - true if the authorization header is valid
 */
export const validateAuthenticationHeader = (
  applicationKey: string,
  applicationSecret: string,
  headers: IncomingHttpHeaders,
  body: any,
  path: string,
  method: string,
): boolean => {
  const normalizedHeaders = normalizeHeaders(headers);

  const authorization = getHeader(normalizedHeaders.authorization);
  if (typeof authorization === 'undefined') {
    return false;
  }
  const authParts = checkAuthorizationHeaderFormat(authorization);
  if (null === authParts) {
    return false;
  }

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
  console.error(`Scheme is not valid: ${authParts[0]}`);
  return false;
};

/**
 * Validate signature headers for Numbers callback. Note: a callbackURL must be associated to the number
 * @param {string} callbackSecret - secret associated to the rented number
 * @param {IncomingHttpHeaders} headers - Incoming request's headers
 * @param {any} body - Incoming request's body
 * @return {boolean} - true if the signature header is valid
 */
export const validateSignatureHeader = (
  callbackSecret: string,
  headers: IncomingHttpHeaders,
  body: any,
): boolean => {
  const normalizedHeaders = normalizeHeaders(headers);
  const signature = getHeader(normalizedHeaders['x-sinch-signature']);
  if (typeof signature === 'undefined') {
    return false;
  }
  const expectedSignature = computeHmacSignature(body, callbackSecret);
  return signature === expectedSignature;
};

// ////////////////
// UTILITY METHODS

const normalizeHeaders = (headers: IncomingHttpHeaders) => {
  return Object.fromEntries(
    Object.entries(headers)
      .map(([key, value]) => [key.toLowerCase(), value])
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value !== undefined),
  ) as { [p: string]: string | string[] };
};

const computeHmacSignature = (body: string, secret: string): string => {
  return crypto.createHmac('sha1', secret).update(body).digest('hex');
};

export const computeSignedData = (
  body: string,
  nonce: string,
  timestamp: string,
): string => {
  return `${body}.${nonce}.${timestamp}`;
};

export const calculateWebhookSignature = (
  signedData: string,
  secret: string,
): string => {
  return crypto.createHmac('sha256', secret).update(signedData).digest('base64');
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
    console.error('Invalid authorization value format provided');
    return false;
  }
  if(authKeyAndSecret[0] !== applicationKey) {
    console.error('Application Key is not valid');
    return false;
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
    console.error('Invalid signature');
    return false;
  }

  return true;
};

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

const checkAuthorizationHeaderFormat = (authorizationHeader: string) => {
  const authParts = authorizationHeader.split(' ');
  if(authParts.length !== 2) {
    // The authorization header must be in 2 part: scheme and authorization value
    console.error('Invalid authorization format provided');
    return null;
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
    console.error('Invalid authorization value format provided');
    return false;
  }
  if(authKeyAndSecret[0] !== applicationKey || authKeyAndSecret[1] !== applicationSecret) {
    console.error('Invalid credentials provided');
    return false;
  }
  return true;
};

const getHeader = (headerValue: string | string[]) => {
  return Array.isArray(headerValue)
    ? headerValue[0]
    : headerValue;
};
