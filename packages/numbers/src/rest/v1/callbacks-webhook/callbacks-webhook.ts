import { CallbackPayload } from '../../../models';
import { IncomingHttpHeaders } from 'http';
import { validateSignatureHeader } from '@sinch/sdk-client';

export type NumbersCallback = CallbackPayload;

export class NumbersCallbackWebhooks {

  private readonly callbackSecret: string;

  constructor(callbackSecret: string) {
    this.callbackSecret = callbackSecret;
  }

  public validateRequestIntegrity(
    headers: IncomingHttpHeaders,
    body: any,
  ): boolean {
    return validateSignatureHeader(
      this.callbackSecret,
      headers,
      body,
    );
  }

  public parseNumbersEventNotification(eventBody: any): NumbersCallback {
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
