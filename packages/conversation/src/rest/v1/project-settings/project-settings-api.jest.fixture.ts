import { ProjectSettingsApi } from './project-settings-api';
import {
  CreateProjectSettingsRequestData,
  DeleteProjectSettingsRequestData,
  GetProjectSettingsRequestData,
  ProjectSettings,
  UpdateProjectSettingsRequestData,
} from '../../../models';

export class ProjectSettingsApiFixture implements Partial<Readonly<ProjectSettingsApi>> {

  /**
   * Fixture associated to function create
   */
  public create: jest.Mock<Promise<ProjectSettings>, [CreateProjectSettingsRequestData]> = jest.fn();
  /**
   * Fixture associated to function delete
   */
  public delete: jest.Mock<Promise<void>, [DeleteProjectSettingsRequestData]> = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<ProjectSettings>, [GetProjectSettingsRequestData]> = jest.fn();
  /**
   * Fixture associated to function update
   */
  public update: jest.Mock<Promise<ProjectSettings>, [UpdateProjectSettingsRequestData]> = jest.fn();
}

