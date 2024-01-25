import { ConversationMessage } from '../../../models';
import { SendMessageResponse } from '../../../models';
import { MessagesApi, DeleteMessageRequestData, GetMessageRequestData, ListMessagesRequestData, SendMessageRequestData } from './messages-api';
import { ApiListPromise } from '@sinch/sdk-client';

export class MessagesApiFixture implements Partial<Readonly<MessagesApi>> {

  /**
   * Fixture associated to function delete
   */
  public delete: jest.Mock<Promise<any>, [DeleteMessageRequestData]> = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<ConversationMessage>, [GetMessageRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<ApiListPromise<ConversationMessage>, [ListMessagesRequestData]> = jest.fn();
  /**
   * Fixture associated to function send
   */
  public send: jest.Mock<Promise<SendMessageResponse>, [SendMessageRequestData]> = jest.fn();
}

