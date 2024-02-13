import { IncomingHttpHeaders } from 'http';

export interface CallbackProcessor<T> {

  validateAuthenticationHeader(
    headers: IncomingHttpHeaders,
    body: any,
    path: string,
    method: string,
  ): boolean;

  parseEvent(eventBody: any): T;

}
