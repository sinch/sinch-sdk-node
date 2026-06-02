import { Given, Then, When } from '@cucumber/cucumber';
import { FaxCallbackWebhooks, Fax } from '../../../../src';
import assert from 'assert';

let faxCallbackWebhook: FaxCallbackWebhooks;
let rawEvent: string;
let event: Fax.FaxWebhookEventParsed;

Given('the Fax Webhooks handler is available', function () {
  faxCallbackWebhook = new FaxCallbackWebhooks();
});

When('I send a request to trigger the INCOMING_FAX event with the "{}" content type', async (contentType) => {
  const response = await fetch(`http://localhost:3012/webhooks/fax/incoming-fax/${contentType}`);
  rawEvent = await response.text();
  event = faxCallbackWebhook.parseEvent(rawEvent);
});

Then('the event describes an INCOMING_FAX event with the application-json content type', () => {
  assert.equal(event.event, 'INCOMING_FAX');
  assert.deepEqual(event.eventTime, new Date('2024-06-06T14:42:35.000Z'));
  const fax = event.fax!;
  assert.equal(fax.id, '01W4FFL35P4NC4K35CR3P35TOP1');
  assert.equal(fax.direction, 'INBOUND');
  assert.equal(fax.from, '+16179216545');
  assert.equal(fax.to, '+17818510000');
  assert.equal(fax.numberOfPages, 1);
  assert.equal(fax.status, 'COMPLETED');
  assert.equal(fax.headerTimeZone, 'UTC');
  assert.equal(fax.retryDelaySeconds, 60);
  assert.equal(fax.resolution, 'FINE');
  assert.equal(fax.callbackUrl, 'https://my.callback.url/fax');
  assert.equal(fax.callbackUrlContentType, 'application/json');
  assert.equal(fax.projectId, '123coffee-dada-beef-cafe-baadc0de5678');
  assert.equal(fax.serviceId, '01W4FFL35P4NC4K35FAXSERVICE');
  assert.equal(fax.price?.amount, '0.045');
  assert.equal(fax.price?.currencyCode, 'USD');
  assert.equal(fax.maxRetries, 0);
  assert.deepEqual(fax.createTime, new Date('2026-06-06T14:42:22Z'));
  assert.deepEqual(fax.completedTime, new Date('2026-06-06T14:42:22Z'));
  assert.equal(fax.headerText, '');
  assert.equal(fax.headerPageNumbers, true);
  assert.equal(fax.hasFile, true);
});

Then('the event describes an INCOMING_FAX event with the multipart-formdata content type', () => {
  assert.equal(event.event, 'INCOMING_FAX');
  assert.deepEqual(event.eventTime, new Date('2024-06-06T14:42:46.000Z'));
  const fax = event.fax!;
  assert.equal(fax.id, '01W4FFL35P4NC4K35CR3P35TOP2');
  assert.equal(fax.from, '+16179216545');
  assert.equal(fax.to, '+17818510000');
  assert.equal(fax.numberOfPages, 0);
  assert.equal(fax.status, 'FAILURE');
  assert.equal(fax.headerTimeZone, 'UTC');
  assert.equal(fax.retryDelaySeconds, 60);
  assert.equal(fax.resolution, 'FINE');
  assert.equal(fax.callbackUrl, 'https://my.callback.url/fax');
  assert.equal(fax.callbackUrlContentType, 'multipart/form-data');
  assert.equal(fax.errorType, 'FAX_ERROR');
  assert.equal(fax.errorMessage, 'No fax tone detected');
  assert.equal(fax.errorCode, 132);
  assert.equal(fax.projectId, '123coffee-dada-beef-cafe-baadc0de5678');
  assert.equal(fax.serviceId, '01W4FFL35P4NC4K35FAXSERVICE');
  assert.equal(fax.maxRetries, 0);
  assert.deepEqual(fax.createTime, new Date('2026-06-06T14:42:48Z'));
  assert.deepEqual(fax.completedTime, new Date('2026-06-06T14:42:48Z'));
  assert.equal(fax.headerText, '');
  assert.equal(fax.headerPageNumbers, true);
  assert.equal(fax.hasFile, false);
});
