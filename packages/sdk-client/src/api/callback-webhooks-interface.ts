import { IncomingHttpHeaders } from 'http';

/** @internal */
export interface CallbackProcessor<T> {

  validateAuthenticationHeader(
    headers: IncomingHttpHeaders,
    body: any,
    path: string,
    method: string,
  ): boolean;

  parseEvent(eventBody: any): T;

}
