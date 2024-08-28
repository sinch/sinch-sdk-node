import { VerificationCallbackEvent, VerificationRequestEvent, VerificationResultEvent } from '../../../models';
import { CallbackProcessor, SinchClientParameters, validateAuthenticationHeader } from '@sinch/sdk-client';
import { IncomingHttpHeaders } from 'http';

/** @deprecated - use Verification.VerificationCallback instead */
export type VerificationCallback = VerificationRequestEvent | VerificationResultEvent;

export class VerificationCallbackWebhooks implements CallbackProcessor<VerificationCallbackEvent>{

  private readonly sinchClientParameters: SinchClientParameters;

  constructor(sinchClientParameters: SinchClientParameters) {
    this.sinchClientParameters = sinchClientParameters;
  }

  /**
   * Validate authorization header for callback request
   * @param {IncomingHttpHeaders} headers - Incoming request's headers
   * @param {any} body - Incoming request's body
   * @param {string} path - Incoming request's path
   * @param {string} method - Incoming request's HTTP method
   * @return {boolean} - true if the authorization header is valid
   */
  public validateAuthenticationHeader(
    headers: IncomingHttpHeaders,
    body: any,
    path: string,
    method: string,
  ): boolean {
    if (!this.sinchClientParameters.applicationKey || !this.sinchClientParameters.applicationSecret) {
      throw new Error('The application key and secret must be defined');
    }
    return validateAuthenticationHeader(
      this.sinchClientParameters.applicationKey,
      this.sinchClientParameters.applicationSecret,
      headers, body, path, method);
  }

  /**
   * Reviver for a Verification Event.
   * This method ensures the object can be treated as a Verification Event and should be called before any action is taken to manipulate the object.
   * @param {any} eventBody - The event body containing the verification event notification.
   * @return {VerificationCallbackEvent} - The parsed verification event object.
   */
  public parseEvent(eventBody: any): VerificationCallbackEvent {
    if (eventBody.event) {
      switch (eventBody.event) {
      case 'VerificationRequestEvent':
        return eventBody as VerificationRequestEvent;
      case 'VerificationResultEvent':
        return eventBody as VerificationResultEvent;
      default:
        throw new Error(`Unknown Verification event type: ${eventBody.event}`);
      }
    }
    console.log(`Unknown Verification event structure:\n${JSON.stringify(eventBody)}`);
    throw new Error('Unknown Verification event');
  }

}
