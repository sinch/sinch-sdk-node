import { ElasticSipTrunking } from '@sinch/sdk-core';
import {
  initElasticSipTrunkingService,
  printFullResponse,
} from '../../config';

(async () => {
  console.log('******************');
  console.log('* AddEstProjects *');
  console.log('******************');

  const requestData: ElasticSipTrunking.AddProjectsRequestData = {
    addProjectsRequestBody: {
      projectIds: [
        '00000000-0000-0000-0000-000000000000',
      ],
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.projects.add(requestData);

  printFullResponse(response);
})();
