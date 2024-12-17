import { EmailsApi } from './emails-api';
import {
  GetStoredEmailResponse,
  SendEmailResponse,
  SendingQueuesStatusResponse,
  SendEmailRequest,
  SendMimeEmailRequest,
} from '../../../models';
import { MailgunStorageHostname } from '@sinch/sdk-client';

export class EmailsApiFixture implements Partial<Readonly<EmailsApi>> {
  /**
   * Fixture associated to function sendEmail
   */
  public sendEmail: jest.Mock<Promise<SendEmailResponse>, [string, SendEmailRequest]> = jest.fn();
  /**
   * Fixture associated to function sendMimeEmail
   */
  public sendMimeEmail: jest.Mock<Promise<SendEmailResponse>, [string, SendMimeEmailRequest]> = jest.fn();
  /**
   * Fixture associated to function getStoredEmail
   */
  public getStoredEmail: jest.Mock<Promise<GetStoredEmailResponse>, [string, string]> = jest.fn();
  /**
   * Fixture associated to function purgeSendingQueue
   */
  public purgeSendingQueue: jest.Mock<Promise<Record<string, never>>, [string, MailgunStorageHostname]> = jest.fn();
  /**
   * Fixture associated to function getSendingQueuesStatus
   */
  public getSendingQueuesStatus: jest.Mock<Promise<SendingQueuesStatusResponse>, [string]> = jest.fn();
}