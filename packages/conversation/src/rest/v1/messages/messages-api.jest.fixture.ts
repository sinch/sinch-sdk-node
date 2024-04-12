import { ApiListPromise } from '@sinch/sdk-client';
import { MessagesApi } from './messages-api';
import {
  ConversationMessage,
  Recipient,
  SendMessageResponse,
  DeleteMessageRequestData,
  GetMessageRequestData,
  ListMessagesRequestData,
  UpdateMessageRequestData,
  SendCardMessageRequestData,
  SendTextMessageRequestData,
  SendCarouselMessageRequestData,
  SendChoiceMessageRequestData,
  SendContactInfoMessageRequestData,
  SendListMessageRequestData,
  SendLocationMessageRequestData,
  SendMediaMessageRequestData,
  SendTemplateMessageRequestData,
  SendMessageRequestData,
} from '../../../models';

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
   * Fixture associated to function sendCardMessage
   */
  public sendCardMessage: jest.Mock<
    Promise<SendMessageResponse>,
    [SendCardMessageRequestData<Recipient>]
  > = jest.fn();
  /**
   * Fixture associated to function sendTextMessage
   */
  public sendCarouselMessage: jest.Mock<
    Promise<SendMessageResponse>,
    [SendCarouselMessageRequestData<Recipient>]
  > = jest.fn();
  /**
   * Fixture associated to function sendTextMessage
   */
  public sendChoiceMessage: jest.Mock<
    Promise<SendMessageResponse>,
    [SendChoiceMessageRequestData<Recipient>]
  > = jest.fn();
  /**
   * Fixture associated to function sendTextMessage
   */
  public sendContactInfoMessage: jest.Mock<
    Promise<SendMessageResponse>,
    [SendContactInfoMessageRequestData<Recipient>]
  > = jest.fn();
  /**
   * Fixture associated to function sendTextMessage
   */
  public sendListMessage: jest.Mock<
    Promise<SendMessageResponse>,
    [SendListMessageRequestData<Recipient>]
  > = jest.fn();
  /**
   * Fixture associated to function sendTextMessage
   */
  public sendLocationMessage: jest.Mock<
    Promise<SendMessageResponse>,
    [SendLocationMessageRequestData<Recipient>]
  > = jest.fn();
  /**
   * Fixture associated to function sendTextMessage
   */
  public sendMediaMessage: jest.Mock<
    Promise<SendMessageResponse>,
    [SendMediaMessageRequestData<Recipient>]
  > = jest.fn();
  /**
   * Fixture associated to function sendTextMessage
   */
  public sendTemplateMessage: jest.Mock<
    Promise<SendMessageResponse>,
    [SendTemplateMessageRequestData<Recipient>]
  > = jest.fn();
  /**
   * Fixture associated to function sendTextMessage
   */
  public sendTextMessage: jest.Mock<
    Promise<SendMessageResponse>,
    [SendTextMessageRequestData<Recipient>]
  > = jest.fn();
  /**
   * Fixture associated to function send
   */
  public send: jest.Mock<
    Promise<SendMessageResponse>,
    [SendMessageRequestData<Recipient>]
  > = jest.fn();
  /**
   * Fixture associated to function update
   */
  public update: jest.Mock<Promise<ConversationMessage>, [UpdateMessageRequestData]> = jest.fn();
}
