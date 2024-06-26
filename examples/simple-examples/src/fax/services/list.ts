import { Fax, PageResult } from '@sinch/sdk-core';
import { getPrintFormat, initFaxService, printFullResponse } from '../../config';

const populateServicesList = (
  servicesPage: PageResult<Fax.ServiceResponse>,
  fullServicesList: Fax.ServiceResponse[],
  servicesList: string[],
) => {
  fullServicesList.push(...servicesPage.data);
  servicesPage.data.map((service) =>  {
    servicesList.push(`Service ID: '${service.id} - Service name: '${service.name}'`);
  });
};

(async () => {
  console.log('****************');
  console.log('* listServices *');
  console.log('****************');

  const requestData: Fax.ListServicesRequestData = {
    pageSize: 2,
  };

  const faxService = initFaxService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await faxService.services.list(requestData);

  // Init data structure to hold the response content
  const fullServicesList: Fax.ServiceResponse[] = [];
  // Init data structure to hold the response content for pretty print
  const servicesList: string[] = [];

  // Loop on all the pages to get all the services
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateServicesList(response, fullServicesList, servicesList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(servicesList.length > 0
      ? `List of services:\n${servicesList.join('\n')}`
      : 'Sorry, no services were found');
  } else {
    printFullResponse(fullServicesList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const service of faxService.services.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`Service ID: '${service.id} - Service name: '${service.name}'`);
    } else {
      console.log(service);
    }
  }
})();
