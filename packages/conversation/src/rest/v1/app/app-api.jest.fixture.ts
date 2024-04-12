import { AppApi } from './app-api';
import {
  AppResponse,
  ListAppsResponse,
  CreateAppRequestData,
  DeleteAppRequestData,
  GetAppRequestData,
  ListAppsRequestData,
  UpdateAppRequestData,
} from '../../../models';

export class AppApiFixture implements Partial<Readonly<AppApi>> {

  /**
   * Fixture associated to function createApp
   */
  public create: jest.Mock<Promise<AppResponse>, [CreateAppRequestData]> = jest.fn();
  /**
   * Fixture associated to function deleteApp
   */
  public delete: jest.Mock<Promise<any>, [DeleteAppRequestData]> = jest.fn();
  /**
   * Fixture associated to function getApp
   */
  public get: jest.Mock<Promise<AppResponse>, [GetAppRequestData]> = jest.fn();
  /**
   * Fixture associated to function listApps
   */
  public list: jest.Mock<Promise<ListAppsResponse>, [ListAppsRequestData]> = jest.fn();
  /**
   * Fixture associated to function updateApp
   */
  public update: jest.Mock<Promise<AppResponse>, [UpdateAppRequestData]> = jest.fn();
}
