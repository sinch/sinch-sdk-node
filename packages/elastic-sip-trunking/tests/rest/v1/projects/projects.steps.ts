import { ElasticSipTrunkingService, ElasticSipTrunking } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { ProjectsApi } from '../../../../src/rest/v1/projects';

let projectsApi: ProjectsApi;
let addProjectsResponse: ElasticSipTrunking.AddProjectsResponse;

Given('the Elastic SIP Trunking service "Projects" is available', function () {
  const elasticSipTrunkingService = new ElasticSipTrunkingService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    elasticSipTrunkingHostname: 'http://localhost:3016',
  });
  projectsApi = elasticSipTrunkingService.projects;
});

When('I send a request to add a new project for use with EST', async () => {
  addProjectsResponse = await projectsApi.add({
    addProjectsRequestBody: {
      projectIds: ['babywolf-howl-over-hill-silverforest'],
    },
  });
});

Then('the response contains the list of projects added', () => {
  assert.ok(addProjectsResponse.addedProjects);
  assert.equal(addProjectsResponse.addedProjects.length, 1);
  assert.equal(addProjectsResponse.addedProjects[0], 'babywolf-howl-over-hill-silverforest');
});
