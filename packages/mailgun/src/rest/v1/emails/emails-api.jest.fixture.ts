import { EmailsApi } from './emails-api';
import {
  GenericResponse,
  GetEmailResponse,
  SendEmailResponse,
  SendingQueuesStatusResponse,
  SendEmailRequest,
  SendMimeEmailRequest,
} from '../../../models';

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
   * Fixture associated to function getEmail
   */
  public getEmail: jest.Mock<Promise<GetEmailResponse>, [string, string]> = jest.fn();
  /**
   * Fixture associated to function purgeDomainQueues
   */
  public purgeDomainQueues: jest.Mock<Promise<GenericResponse>, [string]> = jest.fn();
  /**
   * Fixture associated to function getSendingQueuesStatus
   */
  public getSendingQueuesStatus: jest.Mock<Promise<SendingQueuesStatusResponse>, [string]> = jest.fn();
}
