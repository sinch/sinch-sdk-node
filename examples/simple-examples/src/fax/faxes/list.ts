import { Fax, PageResult } from '@sinch/sdk-core';
import { getPrintFormat, initFaxService, printFullResponse } from '../../config';

const populateFaxesList = (
  faxPage: PageResult<Fax.Fax>,
  fullFaxesList: Fax.Fax[],
  faxesList: string[],
) => {
  fullFaxesList.push(...faxPage.data);
  faxPage.data.map((fax) =>  {
    faxesList.push(`Fax ID: '${fax.id}' - Created at: '${fax.createTime}' - Status: '${fax.status}'`);
  });
};

(async () => {
  console.log('************');
  console.log('* getFaxes *');
  console.log('************');

  const today = new Date();
  const previousMonth = (today.getUTCMonth() - 1) % 12;
  const lastMonth = new Date().setMonth(previousMonth);

  // Example of createTime filter
  // - fetch last month's faxes (with Date objects)
  //   => Output = ?createTime>=2024-04-24T11:33:44Z&createTime<=2024-05-24T11:33:44Z
  //   createTimeFilter: {
  //     from: new Date(lastMonth),
  //     to: new Date(),
  //   }
  // - fetch last month's faxes (with DateFormat objets)
  //   => Output = ?createTime>=2024-04-24&createTime<=2024-05-24
  //   createTimeFilter: {
  //     from: {
  //       date: new Date(lastMonth),
  //       unit: 'day',
  //     },
  //     to: {
  //       date: new Date(),
  //       unit: 'day',
  //     },
  //   }

  const requestData: Fax.ListFaxesRequestData = {
    pageSize: 10,
    createTimeRange: {
      from: {
        date: new Date(lastMonth),
        unit: 'day',
      },
      to: {
        date: new Date(),
        unit: 'day',
      },
    },
  };

  const faxService = initFaxService();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response = await faxService.faxes.list(requestData);

  // Init data structure to hold the response content
  const fullFaxesList: Fax.Fax[] = [];
  // Init data structure to hold the response content for pretty print
  const faxesList: string[] = [];

  // Loop on all the pages to get all the faxes
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateFaxesList(response, fullFaxesList, faxesList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(faxesList.length > 0
      ? `List of faxes:\n${faxesList.join('\n')}`
      : 'Sorry, no faxes were found');
  } else {
    printFullResponse(fullFaxesList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const fax of faxService.faxes.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`Fax ID: '${fax.id}' - Created at: '${fax.createTime}' - Status: '${fax.status}'`);
    } else {
      console.log(fax);
    }
  }
})();
