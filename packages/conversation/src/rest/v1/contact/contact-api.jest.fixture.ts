import { ApiListPromise } from '@sinch/sdk-client';
import { ContactApi } from './contact-api';
import {
  Contact,
  ContactId,
  IdentifiedBy,
  Recipient,
  CreateContactRequestData,
  DeleteContactRequestData,
  GetChannelProfileRequestData,
  GetContactRequestData,
  ListContactsRequestData,
  MergeContactRequestData,
  UpdateContactRequestData,
  GetChannelProfileResponse,
  IdentityConflict,
  ListIdentityConflictsRequestData,
} from '../../../models';

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
   * Fixture associated to function getChannelProfileByContactId
   */
  public getChannelProfileByContactId: jest.Mock<
    Promise<GetChannelProfileResponse>,
    [GetChannelProfileRequestData<ContactId>]
  > = jest.fn();
  /**
   * Fixture associated to function getChannelProfileByChannelIdentity
   */
  public getChannelProfileByChannelIdentity: jest.Mock<
    Promise<GetChannelProfileResponse>,
    [GetChannelProfileRequestData<IdentifiedBy>]
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
   * Fixture associated to function listIdentityConflicts
   */
  public listIdentityConflicts: jest.Mock<
    ApiListPromise<IdentityConflict>, [ListIdentityConflictsRequestData]> = jest.fn();
  /**
   * Fixture associated to function mergeContact
   */
  public mergeContact: jest.Mock<Promise<Contact>, [MergeContactRequestData]> = jest.fn();
  /**
   * Fixture associated to function update
   */
  public update: jest.Mock<Promise<Contact>, [UpdateContactRequestData]> = jest.fn();
}
