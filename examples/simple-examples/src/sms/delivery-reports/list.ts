import { getPrintFormat, initSmsServiceWithServicePlanId, printFullResponse } from '../../config';
import {
  PageResult,
  Sms,
} from '@sinch/sdk-core';

const populateDeliveryReportsList = (
  deliveryReportsListPage: PageResult<Sms.RecipientDeliveryReport>,
  fullDeliveryReportsList: Sms.RecipientDeliveryReport[],
  deliveryReportsList: string[],
) => {
  fullDeliveryReportsList.push(...deliveryReportsListPage.data);
  deliveryReportsListPage.data?.map((deliveryReport) => {
    deliveryReportsList.push(`Delivery support status: ${deliveryReport.status} - Type: ${deliveryReport.type} - Batch ID: ${deliveryReport.batch_id}`);
  });
};

(async () => {
  console.log('**********************');
  console.log('* getDeliveryReports *');
  console.log('**********************');

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  oneWeekAgo.setHours(0, 0, 0, 0);

  const requestData: Sms.ListDeliveryReportsRequestData= {
    start_date: oneWeekAgo,
  };

  const smsService = initSmsServiceWithServicePlanId();

  // ----------------------------------------------
  // Method 1: Fetch the data page by page manually
  // ----------------------------------------------
  let response;
  try {
    response = await smsService.deliveryReports.list(requestData);
  } catch (error) {
    console.error(`ERROR: Impossible to get the list of delivery reports starting at ${requestData.start_date}`);
    throw error;
  }

  const fullDeliveryReportsList: Sms.RecipientDeliveryReport[] = [];
  const deliveryReportsList: string[] = [];

  // Loop on all the pages to get all the delivery reports
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    populateDeliveryReportsList(response, fullDeliveryReportsList, deliveryReportsList);
    if (response.hasNextPage) {
      response = await response.nextPage();
    } else {
      reachedEndOfPages = true;
    }
  }

  const printFormat = getPrintFormat(process.argv);

  if (printFormat === 'pretty') {
    console.log(deliveryReportsList.length > 0
      ? 'List of delivery reports: ' + JSON.stringify(deliveryReportsList, null, 2)
      : 'Sorry, no delivery reports were found.');
  } else {
    printFullResponse(fullDeliveryReportsList);
  }

  // ---------------------------------------------------------------------
  // Method 2: Use the iterator and fetch data on more pages automatically
  // ---------------------------------------------------------------------
  for await (const deliveryReport of smsService.deliveryReports.list(requestData)) {
    if (printFormat === 'pretty') {
      console.log(`Delivery support status: ${deliveryReport.status} - Type: ${deliveryReport.type} - Batch ID: ${deliveryReport.batch_id}`);
    } else {
      console.log(deliveryReport);
    }
  }

})();
