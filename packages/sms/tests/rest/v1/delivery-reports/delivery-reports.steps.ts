import { DeliveryReportsApi, SmsService, Sms  } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';
import { PageResult } from '@sinch/sdk-client';

let deliveryReportsApi: DeliveryReportsApi;
let deliveryReport: Sms.DeliveryReport;
let recipientDeliveryReport: Sms.RecipientDeliveryReport;
let listResponse: PageResult<Sms.RecipientDeliveryReport>;
let recipientDeliveryReportList: Sms.RecipientDeliveryReport[];
let pagesIteration: number;

Given('the SMS service "Delivery Reports" is available', () => {
  const smsService = new SmsService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    smsHostname: 'http://localhost:3017',
  });
  deliveryReportsApi = smsService.deliveryReports;
});

When('I send a request to retrieve a summary SMS delivery report', async () => {
  const requestData: Sms.GetDeliveryReportByBatchIdRequestData = {
    batch_id: '01W4FFL35P4NC4K35SMSBATCH1',
    status: [
      'Delivered',
      'Failed',
    ],
    code: '15,0',
  };
  deliveryReport = await deliveryReportsApi.get(requestData);
});

Then('the response contains a summary SMS delivery report', () => {
  assert.equal(deliveryReport.batch_id, '01W4FFL35P4NC4K35SMSBATCH1');
  assert.equal(deliveryReport.client_reference, 'reference_e2e');
  assert.ok(deliveryReport.statuses);
  let status = deliveryReport.statuses[0];
  assert.equal(status.code, 15);
  assert.equal(status.count, 1);
  assert.equal(status.recipients, undefined);
  const failedStatus: Sms.DeliveryReportStatusEnum = 'Failed';
  assert.equal(status.status, failedStatus);
  status = deliveryReport.statuses[1];
  assert.equal(status.code, 0);
  assert.equal(status.count, 1);
  assert.equal(status.recipients, undefined);
  const deliveredStatus: Sms.DeliveryReportStatusEnum = 'Delivered';
  assert.equal(status.status, deliveredStatus);
  assert.equal(deliveryReport.total_message_count, 2);
  assert.equal(deliveryReport.type, 'delivery_report_sms');
});

When('I send a request to retrieve a full SMS delivery report', async () => {
  const requestData: Sms.GetDeliveryReportByBatchIdRequestData = {
    batch_id: '01W4FFL35P4NC4K35SMSBATCH1',
    type: 'full',
  };
  deliveryReport = await deliveryReportsApi.get(requestData);
});

Then('the response contains a full SMS delivery report', () => {
  assert.equal(deliveryReport.batch_id, '01W4FFL35P4NC4K35SMSBATCH1');
  assert.ok(deliveryReport.statuses);
  const status = deliveryReport.statuses[0];
  assert.ok(status.recipients);
  assert.equal(status.code, 0);
  assert.equal(status.count, 1);
  assert.equal(status.recipients[0], '12017777777');
  const deliveredStatus: Sms.DeliveryReportStatusEnum = 'Delivered';
  assert.equal(status.status, deliveredStatus);
});

When('I send a request to retrieve a recipient\'s delivery report', async () => {
  const requestData: Sms.GetDeliveryReportByPhoneNumberRequestData = {
    batch_id: '01W4FFL35P4NC4K35SMSBATCH1',
    phone_number: '12017777777',
  };
  recipientDeliveryReport = await deliveryReportsApi.getForNumber(requestData);
});

Then('the response contains the recipient\'s delivery report details', () => {
  assert.equal(recipientDeliveryReport.batch_id, '01W4FFL35P4NC4K35SMSBATCH1');
  assert.equal(recipientDeliveryReport.recipient, '12017777777');
  assert.equal(recipientDeliveryReport.client_reference, 'reference_e2e');
  const deliveredStatus: Sms.DeliveryReportStatusEnum = 'Delivered';
  assert.equal(recipientDeliveryReport.status, deliveredStatus);
  assert.equal(recipientDeliveryReport.type, 'recipient_delivery_report_sms');
  assert.equal(recipientDeliveryReport.code, 0);
  assert.deepEqual(recipientDeliveryReport.at, new Date('2024-06-06T13:06:27.833Z'));
  assert.deepEqual(recipientDeliveryReport.operator_status_at, new Date('2024-06-06T13:06:00Z'));
});

When('I send a request to list the SMS delivery reports', async () => {
  const requestData: Sms.ListDeliveryReportsRequestData = {};
  listResponse = await deliveryReportsApi.list(requestData);
});

Then('the response contains {string} SMS delivery reports', (expectedAnswer: string) => {
  const expectedDeliveryReportsCount = parseInt(expectedAnswer, 10);
  assert.equal(listResponse.data.length, expectedDeliveryReportsCount);
});

When('I send a request to list all the SMS delivery reports', async () => {
  recipientDeliveryReportList = [];
  for await (const deliveryReport of deliveryReportsApi.list({ page_size: 2 })) {
    recipientDeliveryReportList.push(deliveryReport);
  }
});

When('I iterate manually over the SMS delivery reports pages', async () => {
  recipientDeliveryReportList = [];
  listResponse = await deliveryReportsApi.list({
    page_size: 2,
  });
  recipientDeliveryReportList.push(...listResponse.data);
  pagesIteration = 1;
  let reachedEndOfPages = false;
  while (!reachedEndOfPages) {
    if (listResponse.hasNextPage) {
      listResponse = await listResponse.nextPage();
      recipientDeliveryReportList.push(...listResponse.data);
      pagesIteration++;
    } else {
      reachedEndOfPages = true;
    }
  }
});

Then('the SMS delivery reports list contains {string} SMS delivery reports',  (expectedAnswer: string) => {
  const expectedDeliveryReportsCount = parseInt(expectedAnswer, 10);
  assert.equal(recipientDeliveryReportList.length, expectedDeliveryReportsCount);
});

Then('the SMS delivery reports iteration result contains the data from {string} pages',  (expectedAnswer: string) => {
  const expectedPagesCount = parseInt(expectedAnswer, 10);
  assert.equal(pagesIteration, expectedPagesCount);
});
