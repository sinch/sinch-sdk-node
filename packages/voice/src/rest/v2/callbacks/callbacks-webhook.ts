import crypto from 'crypto';
import { IncomingHttpHeaders } from 'http';
import { CallbackProcessor } from '@sinch/sdk-client';
import { Call, WebhookRequest, WebhookResponse } from '../../../models/v2';

/**
 * Credentials used to validate Voice v2 webhook signatures.
 *
 * `serviceId` and `serviceSecret` are issued per Voice service in the dashboard.
 * The secret is a Base64 string; it is decoded to 16 bytes before HMAC.
 */
export interface VoiceV2CallbackWebhooksParameters {
  serviceId?: string;
  serviceSecret?: string;
}

export class CallbackWebhooks implements CallbackProcessor<WebhookRequest> {
  private serviceId?: string;
  private serviceSecret?: string;

  constructor(params: VoiceV2CallbackWebhooksParameters = {}) {
    this.serviceId = params.serviceId;
    this.serviceSecret = params.serviceSecret;
  }

  /**
   * Updates the Voice service credentials used to validate webhook signatures.
   * @param {VoiceV2CallbackWebhooksParameters} credentials - The service ID and Base64 service secret.
   */
  public setCredentials(credentials: VoiceV2CallbackWebhooksParameters): void {
    this.serviceId = credentials.serviceId;
    this.serviceSecret = credentials.serviceSecret;
  }

  /**
   * Validate the Authorization header of a Voice v2 webhook request.
   *
   * Voice v2 signs callbacks with `Authorization: service {serviceId}:{signature}`.
   * The signature is Base64(HMAC-SHA256(secretBytes, UTF8(stringToSign))) where
   * secretBytes is the Base64-decoded service secret.
   *
   * Use the raw request body exactly as delivered — do not re-serialize JSON before validation.
   * @param {IncomingHttpHeaders} headers - Incoming request's headers
   * @param {any} body - Incoming request's raw body
   * @param {string} path - Incoming request's path (no scheme, host, query or fragment)
   * @param {string} method - Incoming request's HTTP method
   * @return {boolean} - true if the authorization header is valid
   */
  public validateAuthenticationHeader(
    headers: IncomingHttpHeaders,
    body: any,
    path: string,
    method: string,
  ): boolean {
    if (!this.serviceId || !this.serviceSecret) {
      throw new Error('The service ID and secret must be defined');
    }

    const normalizedHeaders = normalizeHeaders(headers);
    const authorization = getHeader(normalizedHeaders.authorization);
    if (typeof authorization === 'undefined') {
      return false;
    }

    const authParts = authorization.split(' ');
    if (authParts.length !== 2) {
      return false;
    }
    if (authParts[0].toLowerCase() !== 'service') {
      return false;
    }

    const [receivedServiceId, receivedSignature] = authParts[1].split(':');
    if (!receivedServiceId || !receivedSignature) {
      return false;
    }
    if (receivedServiceId !== this.serviceId) {
      return false;
    }

    const rawBody = toRawBody(body);
    const hasBody = rawBody.length > 0;
    const contentMd5 = hasBody ? calculateMd5(rawBody) : '';
    const contentType = hasBody ? (getHeader(normalizedHeaders['content-type']) ?? '') : '';
    const timestamp = getHeader(normalizedHeaders['x-timestamp']) ?? '';
    const stringToSign = [
      method.toUpperCase(),
      contentMd5,
      contentType,
      `x-timestamp:${timestamp}`,
      path,
    ].join('\n');
    const expectedSignature = calculateSignature(this.serviceSecret, stringToSign);

    return signaturesEqual(receivedSignature, expectedSignature);
  }

  /**
   * Reviver for a Voice v2 webhook event.
   * This method ensures the object can be treated as a Voice v2 webhook event and should be called before any action is taken to manipulate the object.
   * @param {any} eventBody - The event body containing the Voice v2 webhook notification.
   * @return {WebhookRequest} - The parsed webhook event object.
   */
  public parseEvent(eventBody: any): WebhookRequest {
    if (typeof eventBody === 'string') {
      eventBody = JSON.parse(eventBody);
    }
    if (typeof eventBody?.event !== 'string' || eventBody.event.length === 0) {
      throw new Error(`Unknown Voice v2 event: ${JSON.stringify(eventBody)}`);
    }
    if (eventBody.call) {
      eventBody.call = reviveCallDates(eventBody.call);
    }
    return eventBody as WebhookRequest;
  }

  /**
   * Serialize a webhook response body to JSON.
   * @param {WebhookResponse} response - The SVAML commands to return to the Voice platform.
   * @return {string} - The JSON payload to send as the HTTP 200 body.
   */
  public serializeResponse(response: WebhookResponse): string {
    return JSON.stringify(response);
  }

  /**
   * Static reviver for a Voice v2 webhook event.
   * @param {any} eventBody - The event body containing the Voice v2 webhook notification.
   * @return {WebhookRequest} - The parsed webhook event object.
   */
  public static parseEvent(eventBody: any): WebhookRequest {
    const callbackWebhooks = new CallbackWebhooks({});
    return callbackWebhooks.parseEvent(eventBody);
  }

  /**
   * Static serializer for a Voice v2 webhook response.
   * @param {WebhookResponse} response - The SVAML commands to return to the Voice platform.
   * @return {string} - The JSON payload to send as the HTTP 200 body.
   */
  public static serializeResponse(response: WebhookResponse): string {
    const callbackWebhooks = new CallbackWebhooks({});
    return callbackWebhooks.serializeResponse(response);
  }
}

function reviveCallDates(call: Call): Call {
  if (call.startTime) {
    call.startTime = new Date(call.startTime);
  }
  if (call.updateTime) {
    call.updateTime = new Date(call.updateTime);
  }
  if (call.answerTime) {
    call.answerTime = new Date(call.answerTime);
  }
  if (call.endTime) {
    call.endTime = new Date(call.endTime);
  }
  return call;
}

function toRawBody(body: any): string {
  if (typeof body === 'string') {
    return body;
  }
  if (body === undefined || body === null) {
    return '';
  }
  if (Buffer.isBuffer(body)) {
    return body.toString('utf-8');
  }
  return JSON.stringify(body);
}

function calculateMd5(body: string): string {
  return crypto.createHash('md5').update(Buffer.from(body, 'utf-8')).digest('base64');
}

function calculateSignature(serviceSecret: string, stringToSign: string): string {
  return crypto.createHmac('sha256', Buffer.from(serviceSecret, 'base64'))
    .update(Buffer.from(stringToSign, 'utf-8'))
    .digest('base64');
}

function signaturesEqual(received: string, expected: string): boolean {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  if (receivedBuffer.length !== expectedBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(receivedBuffer, expectedBuffer);
}

function normalizeHeaders(headers: IncomingHttpHeaders) {
  return Object.fromEntries(
    Object.entries(headers)
      .map(([key, value]) => [key.toLowerCase(), value])
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value !== undefined),
  ) as { [p: string]: string | string[] };
}

function getHeader(headerValue: string | string[] | undefined) {
  if (typeof headerValue === 'undefined') {
    return undefined;
  }
  return Array.isArray(headerValue) ? headerValue[0] : headerValue;
}
