import { EmailsApi } from './emails-api';
import {
  GenericResponse,
  GetStoredEmailResponse,
  SendEmailResponse,
  SendingQueuesStatusResponse,
  SendEmailRequest,
  SendMimeEmailRequest,
} from '../../../models';
import { MailgunStorageRegion } from '@sinch/sdk-client';

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
   * Fixture associated to function purgeDomainQueues
   */
  public purgeDomainQueues: jest.Mock<Promise<GenericResponse>, [string, MailgunStorageRegion]> = jest.fn();
  /**
   * Fixture associated to function getSendingQueuesStatus
   */
  public getSendingQueuesStatus: jest.Mock<Promise<SendingQueuesStatusResponse>, [string]> = jest.fn();
}
