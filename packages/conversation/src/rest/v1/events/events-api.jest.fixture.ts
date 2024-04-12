import { ApiListPromise } from '@sinch/sdk-client';
import { EventsApi } from './events-api';
import {
  ConversationEvent,
  DeleteEventRequestData,
  Recipient,
  GetEventRequestData,
  ListEventsRequestData,
  SendAgentJoinedEventRequestData,
  SendAgentLeftEventRequestData,
  SendCommentReplyEventRequestData,
  SendComposingEndEventRequestData,
  SendComposingEventRequestData,
  SendEventRequestData,
  SendGenericEventRequestData,
  SendEventResponse,
} from '../../../models';

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
  public send: jest.Mock<Promise<SendEventResponse>, [SendEventRequestData<Recipient>]> = jest.fn();
  /**
   * Fixture associated to function sendComposingEvent
   */
  public sendComposingEvent: jest.Mock<
    Promise<SendEventResponse>,
    [SendComposingEventRequestData<Recipient>]
  > = jest.fn();
  /**
   * Fixture associated to function sendComposingEndEvent
   */
  public sendComposingEndEvent: jest.Mock<
    Promise<SendEventResponse>,
    [SendComposingEndEventRequestData<Recipient>]
  > = jest.fn();
  /**
   * Fixture associated to function sendCommentReplyEvent
   */
  public sendCommentReplyEvent: jest.Mock<
    Promise<SendEventResponse>,
    [SendCommentReplyEventRequestData<Recipient>]
  > = jest.fn();
  /**
   * Fixture associated to function sendAgentJoinedEvent
   */
  public sendAgentJoinedEvent: jest.Mock<
    Promise<SendEventResponse>,
    [SendAgentJoinedEventRequestData<Recipient>]
  > = jest.fn();
  /**
   * Fixture associated to function sendAgentLeftEvent
   */
  public sendAgentLeftEvent: jest.Mock<
    Promise<SendEventResponse>,
    [SendAgentLeftEventRequestData<Recipient>]
  > = jest.fn();
  /**
   * Fixture associated to function sendGenericEvent
   */
  public sendGenericEvent: jest.Mock<
    Promise<SendEventResponse>,
    [SendGenericEventRequestData<Recipient>]
  > = jest.fn();
}
