import { IncomingHttpHeaders } from 'http';
import { SinchEvents } from './sinch-events';
import { WebhookRequest, WebhookResponse } from '../../../models/v2';

export class SinchEventsFixture implements Partial<Readonly<SinchEvents>> {

  /**
   * Fixture associated to function validateAuthenticationHeader
   */
  public validateAuthenticationHeader: jest.Mock<boolean, [IncomingHttpHeaders, any, string, string]> = jest.fn();

  /**
   * Fixture associated to function parseEvent
   */
  public parseEvent: jest.Mock<WebhookRequest, [any]> = jest.fn();

  /**
   * Fixture associated to function serializeResponse
   */
  public serializeResponse: jest.Mock<string, [WebhookResponse]> = jest.fn();
}
