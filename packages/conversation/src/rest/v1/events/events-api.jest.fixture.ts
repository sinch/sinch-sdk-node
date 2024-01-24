import { SendEventResponse } from '../../../models';
import { EventsApi, SendEventRequestData } from './events-api';

export class EventsApiFixture implements Partial<Readonly<EventsApi>> {

  /**
   * Fixture associated to function sendEvent
   */
  public sendEvent: jest.Mock<Promise<SendEventResponse>, [SendEventRequestData]> = jest.fn();
}

