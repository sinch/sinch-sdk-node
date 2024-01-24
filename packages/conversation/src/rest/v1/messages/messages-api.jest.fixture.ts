import { ConversationMessage } from '../../../models';
import { SendMessageResponse } from '../../../models';
import { MessagesApi, DeleteMessageRequestData, GetMessageRequestData, ListMessagesRequestData, SendMessageRequestData } from './messages-api';
import { ApiListPromise } from '@sinch/sdk-client';

export class MessagesApiFixture implements Partial<Readonly<MessagesApi>> {

  /**
   * Fixture associated to function deleteMessage
   */
  public deleteMessage: jest.Mock<Promise<any>, [DeleteMessageRequestData]> = jest.fn();
  /**
   * Fixture associated to function getMessage
   */
  public getMessage: jest.Mock<Promise<ConversationMessage>, [GetMessageRequestData]> = jest.fn();
  /**
   * Fixture associated to function listMessages
   */
  public listMessages: jest.Mock<ApiListPromise<ConversationMessage>, [ListMessagesRequestData]> = jest.fn();
  /**
   * Fixture associated to function sendMessage
   */
  public sendMessage: jest.Mock<Promise<SendMessageResponse>, [SendMessageRequestData]> = jest.fn();
}

