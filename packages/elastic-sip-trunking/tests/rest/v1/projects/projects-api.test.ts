import { SinchClientParameters } from '@sinch/sdk-client';
import { AddProjectsRequestData, AddProjectsResponse } from '../../../../src/models';
import { ProjectsApi, ProjectsApiFixture } from '../../../../src/rest/v1/projects';
import { LazyElasticSipTrunkingApiClient } from '../../../../src';

describe('ProjectsApi', () => {
  let projectsApi: ProjectsApi;
  let fixture: ProjectsApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new ProjectsApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    const lazyClient = new LazyElasticSipTrunkingApiClient(credentials);
    projectsApi = new ProjectsApi(lazyClient);
  });


  describe ('addEstProjects', () => {
    it('should make a POST request to add additional projects to EST', async () => {
      // Given
      const requestData: AddProjectsRequestData = {
        addProjectsRequestBody: {
          projectIds: ['project-id-1', 'project-id-2'],
        },
      };
      const expectedResponse: AddProjectsResponse = {
        addedProjects: ['project-id-1', 'project-id-2'],
      };

      // When
      fixture.add.mockResolvedValue(expectedResponse);
      projectsApi.add = fixture.add;
      const response = await projectsApi.add(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.add).toHaveBeenCalledWith(requestData);
    });
  });
});
