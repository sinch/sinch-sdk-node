import {
  AddEmailToNumbersRequestData,
  DeleteEmailRequestData,
  Email,
  ListEmailsForNumberRequestData,
  ListEmailsForProjectRequestData,
  ListNumbersByEmailRequestData,
  ServicePhoneNumber,
  UpdateEmailRequestData,
} from '../../../models';
import { EmailsApi } from './emails-api';
import { ApiListPromise } from '@sinch/sdk-client';

export class EmailsApiFixture implements Partial<Readonly<EmailsApi>> {

  /**
   * Fixture associated to function addToNumbers
   */
  public addToNumbers: jest.Mock<Promise<Email>, [AddEmailToNumbersRequestData]> = jest.fn();
  /**
   * Fixture associated to function delete
   */
  public delete: jest.Mock<Promise<void>, [DeleteEmailRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<ApiListPromise<Email>, [ListEmailsForProjectRequestData]> = jest.fn();
  /**
   * Fixture associated to function listByNumber
   */
  public listByNumber: jest.Mock<ApiListPromise<string>, [ListEmailsForNumberRequestData]> = jest.fn();
  /**
   * Fixture associated to function listNumbers
   */
  public listNumbers: jest.Mock<ApiListPromise<ServicePhoneNumber>, [ListNumbersByEmailRequestData]> = jest.fn();
  /**
   * Fixture associated to function update
   */
  public update: jest.Mock<Promise<Email>, [UpdateEmailRequestData]> = jest.fn();
}

