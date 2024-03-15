import { Fax } from '../../../models';
import { FaxesApi, DeleteFaxContentRequestData, DownloadFaxContentRequestData, GetFaxRequestData, ListFaxesRequestData, SendFaxRequestData } from './faxes-api';
import { ApiListPromise, FileBuffer } from '@sinch/sdk-client';

export class FaxesApiFixture implements Partial<Readonly<FaxesApi>> {

  /**
   * Fixture associated to function deleteFaxContentById
   */
  public deleteContent: jest.Mock<Promise<void>, [DeleteFaxContentRequestData]> = jest.fn();
  /**
   * Fixture associated to function getFaxFileById
   */
  public downloadContent: jest.Mock<Promise<FileBuffer>, [DownloadFaxContentRequestData]> = jest.fn();
  /**
   * Fixture associated to function getFaxInfoPerId
   */
  public get: jest.Mock<Promise<Fax>, [GetFaxRequestData]> = jest.fn();
  /**
   * Fixture associated to function getFaxes
   */
  public list: jest.Mock<ApiListPromise<Fax>, [ListFaxesRequestData]> = jest.fn();
  /**
   * Fixture associated to function sendFax
   */
  public send: jest.Mock<Promise<Fax>, [SendFaxRequestData]> = jest.fn();
}

