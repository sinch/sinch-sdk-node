import { Contact } from '../../../models';
import { GetChannelProfileResponse } from '../../../models';
import { ContactApi, CreateContactRequestData, DeleteContactRequestData, GetChannelProfileRequestData, GetContactRequestData, ListContactsRequestData, MergeContactRequestData, UpdateContactRequestData } from './contact-api';
import { ApiListPromise } from '@sinch/sdk-client';

export class ContactApiFixture implements Partial<Readonly<ContactApi>> {

  /**
   * Fixture associated to function createContact
   */
  public createContact: jest.Mock<Promise<Contact>, [CreateContactRequestData]> = jest.fn();
  /**
   * Fixture associated to function deleteContact
   */
  public deleteContact: jest.Mock<Promise<any>, [DeleteContactRequestData]> = jest.fn();
  /**
   * Fixture associated to function getChannelProfile
   */
  public getChannelProfile: jest.Mock<Promise<GetChannelProfileResponse>, [GetChannelProfileRequestData]> = jest.fn();
  /**
   * Fixture associated to function getContact
   */
  public getContact: jest.Mock<Promise<Contact>, [GetContactRequestData]> = jest.fn();
  /**
   * Fixture associated to function listContacts
   */
  public listContacts: jest.Mock<ApiListPromise<Contact>, [ListContactsRequestData]> = jest.fn();
  /**
   * Fixture associated to function mergeContact
   */
  public mergeContact: jest.Mock<Promise<Contact>, [MergeContactRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateContact
   */
  public updateContact: jest.Mock<Promise<Contact>, [UpdateContactRequestData]> = jest.fn();
}

