import { ProjectsApi } from './projects-api';
import { AddProjectsRequestData, AddProjectsResponse } from '../../../models';

export class ProjectsApiFixture implements Partial<Readonly<ProjectsApi>> {

  /**
   * Fixture associated to function add
   */
  public add: jest.Mock<Promise<AddProjectsResponse>, [AddProjectsRequestData]> = jest.fn();
}
