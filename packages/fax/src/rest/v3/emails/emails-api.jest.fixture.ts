import { Email, ServicePhoneNumber } from '../../../models';
import {
  EmailsApi,
  DeleteEmailRequestData,
  ListEmailsForProjectRequestData,
  ListNumbersByEmailRequestData,
  UpdateEmailRequestData,
  AddEmailToNumbersRequestData,
} from './emails-api';
import { ApiListPromise } from '@sinch/sdk-client';

export class EmailsApiFixture implements Partial<Readonly<EmailsApi>> {

  /**
   * Fixture associated to function addToNumbers
   */
  public addToNumbers: jest.Mock<Promise<Email>, [AddEmailToNumbersRequestData]> = jest.fn();
  /**
   * Fixture associated to function deleteEmail
   */
  public delete: jest.Mock<Promise<void>, [DeleteEmailRequestData]> = jest.fn();
  /**
   * Fixture associated to function getEmailsForProject
   */
  public list: jest.Mock<ApiListPromise<Email>, [ListEmailsForProjectRequestData]> = jest.fn();
  /**
   * Fixture associated to function getNumbersByEmail
   */
  public listNumbers: jest.Mock<ApiListPromise<ServicePhoneNumber>, [ListNumbersByEmailRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateEmail
   */
  public update: jest.Mock<Promise<Email>, [UpdateEmailRequestData]> = jest.fn();
}

