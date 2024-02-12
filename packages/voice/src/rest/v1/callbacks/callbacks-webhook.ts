import { AceRequest, DiceRequest, IceRequest, NotifyRequest, PieRequest } from '../../../models';
import { SinchClientParameters, validateAuthenticationHeader } from '@sinch/sdk-client';
import { IncomingHttpHeaders } from 'http';

export type VoiceCallback = IceRequest | AceRequest | DiceRequest | PieRequest | NotifyRequest;

export class VoiceCallbackWebhooks {
  private readonly sinchClientParameters: SinchClientParameters;

  constructor(sinchClientParameters: SinchClientParameters) {
    this.sinchClientParameters = sinchClientParameters;
  }

  /**
   * Validate authorization header for callback request
   * @param {IncomingHttpHeaders} headers - Incoming request's headers
   * @param {string} path - Incoming request's path
   * @param {any} body - Incoming request's body
   * @param {string} method - Incoming request's HTTP method
   * @return {boolean} - true if the authorization header is valid
   */
  public validateAuthorizationHeader(
    headers: IncomingHttpHeaders,
    path: string,
    body: any,
    method: string,
  ): boolean {
    if (!this.sinchClientParameters.applicationKey || !this.sinchClientParameters.applicationSecret) {
      throw new Error('The application key and secret must be defined');
    }
    return validateAuthenticationHeader(
      this.sinchClientParameters.applicationKey,
      this.sinchClientParameters.applicationSecret,
      headers, path, body, method);
  }

  /**
   * Reviver for a Voice Event.
   * This method ensures the object can be treated as a Voice Event and should be called before any action is taken to manipulate the object.
   * @param {any} eventBody - The event body containing the voice event notification.
   * @return {VoiceCallback} - The parsed voice event object.
   */
  public parseVoiceEventNotification(eventBody: any): VoiceCallback {
    if (eventBody.event) {
      switch (eventBody.event) {
      case 'ice':
        return eventBody as IceRequest;
      case 'ace':
        return eventBody as AceRequest;
      case 'dice':
        return eventBody as DiceRequest;
      case 'pie':
        return eventBody as PieRequest;
      case 'notify':
        return eventBody as NotifyRequest;
      default:
        throw new Error(`Unknown Voice event type: ${eventBody.event}`);
      }
    }
    console.log(eventBody);
    throw new Error('Unknown Voice event');
  }

}

