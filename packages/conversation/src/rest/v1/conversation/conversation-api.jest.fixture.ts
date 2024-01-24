import { Conversation } from '../../../models';
import { ConversationApi, CreateConversationRequestData, DeleteConversationRequestData, GetConversationRequestData, InjectMessageRequestData, ListConversationsRequestData, StopActiveConversationRequestData, UpdateConversationRequestData } from './conversation-api';
import { ApiListPromise } from '@sinch/sdk-client';

export class ConversationApiFixture implements Partial<Readonly<ConversationApi>> {

  /**
   * Fixture associated to function createConversation
   */
  public createConversation: jest.Mock<Promise<Conversation>, [CreateConversationRequestData]> = jest.fn();
  /**
   * Fixture associated to function deleteConversation
   */
  public deleteConversation: jest.Mock<Promise<any>, [DeleteConversationRequestData]> = jest.fn();
  /**
   * Fixture associated to function getConversation
   */
  public getConversation: jest.Mock<Promise<Conversation>, [GetConversationRequestData]> = jest.fn();
  /**
   * Fixture associated to function injectMessage
   */
  public injectMessage: jest.Mock<Promise<any>, [InjectMessageRequestData]> = jest.fn();
  /**
   * Fixture associated to function listConversations
   */
  public listConversations: jest.Mock<ApiListPromise<Conversation>, [ListConversationsRequestData]> = jest.fn();
  /**
   * Fixture associated to function stopActiveConversation
   */
  public stopActiveConversation: jest.Mock<Promise<any>, [StopActiveConversationRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateConversation
   */
  public updateConversation: jest.Mock<Promise<Conversation>, [UpdateConversationRequestData]> = jest.fn();
}

