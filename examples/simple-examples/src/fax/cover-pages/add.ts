import { Fax } from '@sinch/sdk-core';
import { getFaxServiceIdFromConfig, getPrintFormat, initFaxService, printFullResponse } from '../../config';

(async () => {
  console.log('****************');
  console.log('* AddCoverPage *');
  console.log('****************');

  const serviceId = getFaxServiceIdFromConfig();

  const requestData: Fax.AddCoverPageRequestData = {
    serviceId,
    addCoverPageRequestBody: {
      name: 'New cover page created with the Node.js SDK',
      file: {
        fileContent: 'V2VsY29tZSB0byBTaW5jaCE=',
        fileType: 'PDF',
      },
    },
  };

  const faxService = initFaxService();
  const response = await faxService.coverPages.add(requestData);

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(`New cover page added to the service id '${response.serviceId}' - ID: ${response.id}`);
  } else {
    printFullResponse(response);
  }
})();
