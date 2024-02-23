import { ConversationEvent, SendEventResponse } from '../../../models';
import {
  DeleteEventRequestData,
  EventsApi,
  GetEventRequestData,
  ListEventsRequestData,
  SendEventRequestData,
} from './events-api';
import { ApiListPromise } from '@sinch/sdk-client';

export class EventsApiFixture implements Partial<Readonly<EventsApi>> {

  /**
   * Fixture associated to function delete
   */
  public delete: jest.Mock<Promise<any>, [DeleteEventRequestData]> = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<ConversationEvent>, [GetEventRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<ApiListPromise<ConversationEvent>, [ListEventsRequestData]> = jest.fn();
  /**
   * Fixture associated to function send
   */
  public send: jest.Mock<Promise<SendEventResponse>, [SendEventRequestData]> = jest.fn();
}

