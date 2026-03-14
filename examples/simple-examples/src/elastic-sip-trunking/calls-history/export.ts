import { ElasticSipTrunking } from '@sinch/sdk-core';
import { getPrintFormat, initElasticSipTrunkingService, printFullResponse } from '../../config';

(async () => {
  console.log('*********************');
  console.log('* ExportCallRecords *');
  console.log('*********************');

  const requestData: ElasticSipTrunking.ExportCallRecordsRequestData = {
    createTimeRange: {
      from: new Date('2024-08-01T16:00:00Z'),
    },
  };

  const elasticSipTrunkingService = initElasticSipTrunkingService();
  const response = await elasticSipTrunkingService.calls.export(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`The CSV file name is '${response.fileName}'.\nThe CSV content is:\n ${response.data}`);
  } else {
    printFullResponse(response);
  }

})();
