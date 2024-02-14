import { CallbackPayload } from '../../../models';
import { IncomingHttpHeaders } from 'http';
import { CallbackProcessor, validateSignatureHeader } from '@sinch/sdk-client';

export type NumbersCallback = CallbackPayload;

export class NumbersCallbackWebhooks implements CallbackProcessor<CallbackPayload> {

  private readonly callbackSecret: string;

  constructor(callbackSecret: string) {
    this.callbackSecret = callbackSecret;
  }

  /**
   * Validate authorization header for callback request
   * @param {IncomingHttpHeaders} headers - Incoming request's headers
   * @param {any} body - Incoming request's body
   * @param {string} _path - Incoming request's path
   * @param {string} _method - Incoming request's HTTP method
   * @return {boolean} - true if the X-Sinch-Signature header is valid
   */
  public validateAuthenticationHeader(
    headers: IncomingHttpHeaders,
    body: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _path?: string, _method?: string,
  ): boolean {
    return validateSignatureHeader(
      this.callbackSecret,
      headers,
      body,
    );
  }

  /**
   * Reviver for a Numbers Event.
   * This method ensures the object can be treated as a Numbers Event and should be called before any action is taken to manipulate the object.
   * Indeed, the server returns the timestamp without the timezone information => this method updates the property value to use the Zulu timezone and changes the parameters to a Date
   * @param {any} eventBody - The event body containing the numbers event notification.
   * @return {NumbersCallback} - The parsed voice event object.
   */
  public parseEvent(eventBody: any): NumbersCallback {
    // There is a bug in the API which doesn't send the timezone along with the timestamp
    // As the server formats the timestamp as GMT, we check if the timezone is missing and add it if needed
    const timestamp = eventBody.timestamp;
    const timeZoneRegex = /([+-]\d{2}:?\d{2}|Z)$/;
    if (!timeZoneRegex.test(timestamp)) {
      eventBody.timestamp = timestamp + 'Z';
    }
    if (eventBody.timestamp) {
      eventBody.timestamp = new Date(eventBody.timestamp);
    }
    return eventBody as CallbackPayload;
  };
}
