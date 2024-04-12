import { ApiListPromise } from '@sinch/sdk-client';
import { ConversationApi } from './conversation-api';
import {
  Conversation,
  ConversationRecentMessage,
  InjectEventResponse,
  CreateConversationRequestData,
  DeleteConversationRequestData,
  GetConversationRequestData,
  InjectEventRequestData,
  InjectMessageRequestData,
  ListConversationsRequestData,
  ListRecentConversationsRequestData,
  StopActiveConversationRequestData,
  UpdateConversationRequestData,
} from '../../../models';

export class ConversationApiFixture implements Partial<Readonly<ConversationApi>> {

  /**
   * Fixture associated to function create
   */
  public create: jest.Mock<Promise<Conversation>, [CreateConversationRequestData]> = jest.fn();
  /**
   * Fixture associated to function delete
   */
  public delete: jest.Mock<Promise<any>, [DeleteConversationRequestData]> = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<Conversation>, [GetConversationRequestData]> = jest.fn();
  /**
   * Fixture associated to function injectEvent
   */
  public injectEvent: jest.Mock<Promise<InjectEventResponse>, [InjectEventRequestData]> = jest.fn();
  /**
   * Fixture associated to function injectMessage
   */
  public injectMessage: jest.Mock<Promise<any>, [InjectMessageRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<ApiListPromise<Conversation>, [ListConversationsRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public listRecent: jest.Mock<ApiListPromise<ConversationRecentMessage>, [ListRecentConversationsRequestData]>
    = jest.fn();
  /**
   * Fixture associated to function stopActive
   */
  public stopActive: jest.Mock<Promise<any>, [StopActiveConversationRequestData]> = jest.fn();
  /**
   * Fixture associated to function update
   */
  public update: jest.Mock<Promise<Conversation>, [UpdateConversationRequestData]> = jest.fn();
}
