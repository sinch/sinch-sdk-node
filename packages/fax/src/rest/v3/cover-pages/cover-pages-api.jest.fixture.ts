import { CoverPagesApi } from './cover-pages-api';
import { ApiListPromise } from '@sinch/sdk-client';
import {
  AddCoverPageRequestData,
  CoverPage,
  DeleteCoverPageRequestData,
  GetCoverPageRequestData,
  ListCoverPagesRequestData,
} from '../../../models';

export class CoverPagesApiFixture implements Partial<Readonly<CoverPagesApi>> {

  /**
   * Fixture associated to function add
   */
  public add: jest.Mock<Promise<CoverPage>, [AddCoverPageRequestData]> = jest.fn();
  /**
   * Fixture associated to function delete
   */
  public delete: jest.Mock<Promise<void>, [DeleteCoverPageRequestData]> = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<CoverPage>, [GetCoverPageRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<ApiListPromise<CoverPage>, [ListCoverPagesRequestData]> = jest.fn();
}
