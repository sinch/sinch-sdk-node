import { Given, Then, When } from '@cucumber/cucumber';
import { SmsCallbackWebhooks, SmsCallback, Sms } from '../../../../src';
import assert from 'assert';

let smsCallbackWebhook: SmsCallbackWebhooks;
let rawEvent: any;
let event: SmsCallback;

const processEvent = async (response: Response) => {
  rawEvent = await response.text();
  event = smsCallbackWebhook.parseEvent(JSON.parse(rawEvent));
};

Given('the SMS Webhooks handler is available', () => {
  smsCallbackWebhook = new SmsCallbackWebhooks();
});

When('I send a request to trigger an "incoming SMS" event', async () => {
  const response = await fetch('http://localhost:3017/webhooks/sms/incoming-sms');
  await processEvent(response);
});

Then('the SMS event describes an "incoming SMS" event', () => {
  const incomingSmsEvent = event as Sms.MOText;
  assert.equal(incomingSmsEvent.id, '01W4FFL35P4NC4K35SMSBATCH8');
  assert.equal(incomingSmsEvent.from, '12015555555');
  assert.equal(incomingSmsEvent.to, '12017777777');
  assert.equal(incomingSmsEvent.body, 'Hello John! 👋');
  assert.equal(incomingSmsEvent.type, 'mo_text');
  assert.equal(incomingSmsEvent.operator_id, '311071');
  assert.deepEqual(incomingSmsEvent.received_at, new Date('2024-06-06T07:52:37.386Z'));
});

When('I send a request to trigger an "SMS delivery report" event', async () => {
  const response = await fetch('http://localhost:3017/webhooks/sms/delivery-report-sms');
  await processEvent(response);
});

Then('the SMS event describes an "SMS delivery report" event', () => {
  const deliveryReportEvent = event as Sms.DeliveryReport;
  assert.equal(deliveryReportEvent.batch_id, '01W4FFL35P4NC4K35SMSBATCH8');
  assert.equal(deliveryReportEvent.client_reference, 'client-ref');
  assert.ok(deliveryReportEvent.statuses);
  const status = deliveryReportEvent.statuses[0];
  assert.equal(status.code, 0);
  assert.equal(status.count, 2);
  const deliveryStatus: Sms.DeliveryReportStatusEnum = 'Delivered';
  assert.equal(status.status, deliveryStatus);
  assert.ok(status.recipients);
  assert.equal(status.recipients[0], '12017777777');
  assert.equal(status.recipients[1], '33612345678');
  assert.equal(deliveryReportEvent.type, 'delivery_report_sms');
});

// eslint-disable-next-line max-len
When('I send a request to trigger an "SMS recipient delivery report" event with the status {string}', async (status: string) => {
  const response = await fetch(`http://localhost:3017/webhooks/sms/recipient-delivery-report-sms-${status.toLowerCase()}`);
  await processEvent(response);
});

Then('the SMS event describes an SMS recipient delivery report event with the status "Delivered"', () => {
  const recipientDeliveryReportEvent = event as Sms.RecipientDeliveryReport;
  assert.equal(recipientDeliveryReportEvent.batch_id, '01W4FFL35P4NC4K35SMSBATCH9');
  assert.equal(recipientDeliveryReportEvent.recipient, '12017777777');
  assert.equal(recipientDeliveryReportEvent.code, 0);
  const deliveryStatus: Sms.DeliveryReportStatusEnum = 'Delivered';
  assert.equal(recipientDeliveryReportEvent.status, deliveryStatus);
  assert.equal(recipientDeliveryReportEvent.type, 'recipient_delivery_report_sms');
  assert.equal(recipientDeliveryReportEvent.client_reference, 'client-ref');
  assert.deepEqual(recipientDeliveryReportEvent.at, new Date('2024-06-06T08:17:19.210Z'));
  assert.deepEqual(recipientDeliveryReportEvent.operator_status_at, new Date('2024-06-06T08:17:00Z'));
});

Then('the SMS event describes an SMS recipient delivery report event with the status "Aborted"', () => {
  const recipientDeliveryReportEvent = event as Sms.RecipientDeliveryReport;
  assert.equal(recipientDeliveryReportEvent.batch_id, '01W4FFL35P4NC4K35SMSBATCH9');
  assert.equal(recipientDeliveryReportEvent.recipient, '12010000000');
  assert.equal(recipientDeliveryReportEvent.code, 412);
  const deliveryStatus: Sms.DeliveryReportStatusEnum = 'Aborted';
  assert.equal(recipientDeliveryReportEvent.status, deliveryStatus);
  assert.equal(recipientDeliveryReportEvent.type, 'recipient_delivery_report_sms');
  assert.equal(recipientDeliveryReportEvent.client_reference, 'client-ref');
  assert.deepEqual(recipientDeliveryReportEvent.at, new Date('2024-06-06T08:17:15.603Z'));
});
