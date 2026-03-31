import { CredentialListsApi } from './credential-lists-api';
import {
  Credential,
  CredentialList,
  DeleteCredentialListRequestData,
  UpdateCredentialRequestData,
  UpdateCredentialListRequestData,
  GetCredentialListRequestData,
  ListCredentialListsRequestData,
  ListTrunksForCredentialListRequestData,
  SipTrunk,
  CreateCredentialListRequestData,
} from '../../../models';
import { DeleteCredentialRequestData } from '../../../models';
import { ApiListPromise } from '@sinch/sdk-client';

export class CredentialListsApiFixture implements Partial<Readonly<CredentialListsApi>> {

  /**
   * Fixture associated with function create
   */
  public create: jest.Mock<Promise<CredentialList>, [CreateCredentialListRequestData]> = jest.fn();
  /**
   * Fixture associated with function delete
   */
  public delete: jest.Mock<Promise<void>, [DeleteCredentialListRequestData]> = jest.fn();
  /**
   * Fixture associated with function get
   */
  public get: jest.Mock<Promise<CredentialList>, [GetCredentialListRequestData]> = jest.fn();
  /**
   * Fixture associated with function list
   */
  public list: jest.Mock<ApiListPromise<CredentialList>, [ListCredentialListsRequestData]> = jest.fn();
  /**
   * Fixture associated with function listTrunks
   */
  public listTrunks: jest.Mock<ApiListPromise<SipTrunk>, [ListTrunksForCredentialListRequestData]> = jest.fn();
  /**
   * Fixture associated with function updateCredential
   */
  public updateCredential: jest.Mock<Promise<Credential>, [UpdateCredentialRequestData]> = jest.fn();
  /**
   * Fixture associated with function deleteCredential
   */
  public deleteCredential: jest.Mock<Promise<void>, [DeleteCredentialRequestData]> = jest.fn();
  /**
   * Fixture associated with function update
   */
  public update: jest.Mock<Promise<CredentialList>, [UpdateCredentialListRequestData]> = jest.fn();
}

