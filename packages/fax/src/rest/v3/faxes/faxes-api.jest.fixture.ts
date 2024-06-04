import {
  DeleteFaxContentRequestData,
  DownloadFaxContentRequestData,
  Fax,
  GetFaxRequestData,
  ListFaxesRequestData,
  SendFaxRequestData,
} from '../../../models';
import { FaxesApi } from './faxes-api';
import { ApiListPromise, FileBuffer } from '@sinch/sdk-client';

export class FaxesApiFixture implements Partial<Readonly<FaxesApi>> {

  /**
   * Fixture associated to function deleteContent
   */
  public deleteContent: jest.Mock<Promise<void>, [DeleteFaxContentRequestData]> = jest.fn();
  /**
   * Fixture associated to function downloadContent
   */
  public downloadContent: jest.Mock<Promise<FileBuffer>, [DownloadFaxContentRequestData]> = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<Fax>, [GetFaxRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<ApiListPromise<Fax>, [ListFaxesRequestData]> = jest.fn();
  /**
   * Fixture associated to function send
   */
  public send: jest.Mock<Promise<Fax[]>, [SendFaxRequestData]> = jest.fn();
}

