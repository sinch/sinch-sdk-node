import { Contact, Recipient } from '../../../models';
import { GetChannelProfileResponse } from '../../../models';
import {
  ContactApi,
  CreateContactRequestData,
  DeleteContactRequestData,
  GetChannelProfileRequestData,
  GetContactRequestData,
  ListContactsRequestData,
  MergeContactRequestData,
  UpdateContactRequestData,
} from './contact-api';
import { ApiListPromise } from '@sinch/sdk-client';

export class ContactApiFixture implements Partial<Readonly<ContactApi>> {

  /**
   * Fixture associated to function create
   */
  public create: jest.Mock<Promise<Contact>, [CreateContactRequestData]> = jest.fn();
  /**
   * Fixture associated to function delete
   */
  public delete: jest.Mock<Promise<any>, [DeleteContactRequestData]> = jest.fn();
  /**
   * Fixture associated to function getChannelProfile
   */
  public getChannelProfile: jest.Mock<
    Promise<GetChannelProfileResponse>,
    [GetChannelProfileRequestData<Recipient>]
  > = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<Contact>, [GetContactRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<ApiListPromise<Contact>, [ListContactsRequestData]> = jest.fn();
  /**
   * Fixture associated to function mergeContact
   */
  public mergeContact: jest.Mock<Promise<Contact>, [MergeContactRequestData]> = jest.fn();
  /**
   * Fixture associated to function update
   */
  public update: jest.Mock<Promise<Contact>, [UpdateContactRequestData]> = jest.fn();
}

