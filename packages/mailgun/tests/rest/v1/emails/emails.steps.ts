import { EmailsApi, MailgunService, Mailgun } from '../../../../src';
import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from 'assert';

let emailsApi: EmailsApi;
let sendEmailResponse: Mailgun.SendEmailResponse;
let sendMimeEmailResponse: Mailgun.SendEmailResponse;
let getEmailResponse: Mailgun.GetStoredEmailResponse;
let sendingQueuesStatusResponse: Mailgun.SendingQueuesStatusResponse;
let purgeSendingQueueResponse: void;
const domainName = 'sandbox123.mailgun.org';

Given('the Mailgun service "Emails" is available', () => {
  const mailgunService = new MailgunService({
    mailgunApiKey: 'apiKey',
    mailgunHostname: 'http://localhost:3021',
  });
  emailsApi = mailgunService.emails;
});

When('I send a request to send a text email', async () => {
  sendEmailResponse = await emailsApi.sendEmail(domainName, {
    from: 'Excited E2E user ✉️ <sender@e2e.tst>',
    to: 'destination@e2e.tst',
    subject: 'E2E test text email',
    text: 'Hello, this is a text message for E2E testing.',
  });
});

Then('the sendEmail response contains information about the text email', () => {
  assert.equal(sendEmailResponse.id, '<20240606154318.027ac0b5fc80da62@sandbox123.mailgun.org>');
  assert.equal(sendEmailResponse.message, 'Queued. Thank you.');
});

When('I send a request to send a MIME email', async () => {
  sendMimeEmailResponse = await emailsApi.sendMimeEmail(domainName, {
    to: 'destination@e2e.tst',
    message: formatMimeEmail(),
  });
});

const formatMimeEmail = () => {
  return `From: Excited User <sender@e2e.tst>
  Subject: E2E test MIME email
  Message-ID: <5ef155dc-f9b3-e83b-7c85-8f38aa6bafa0@mailgun.com>
  Date: Thu, 06 Jun 2024 13:33:00 +0000
  MIME-Version: 1.0
  Content-Type: multipart/alternative;
  boundary="--_NmP-42dc57efb261c5a6-Part_1"

  ----_NmP-42dc57efb261c5a6-Part_1
  Content-Type: text/plain; charset=utf-8
  Content-Transfer-Encoding: 7bit

  This is a MIME message
  ----_NmP-42dc57efb261c5a6-Part_1
  Content-Type: text/html; charset=utf-8
  Content-Transfer-Encoding: 7bit

  HTML<br>version<br>of<br>the<br>body
  ----_NmP-42dc57efb261c5a6-Part_1--`;
};

Then('the sendMimeEmail response contains information about the email', () => {
  assert.equal(sendMimeEmailResponse.id, '<20240606154852.a3fafd8a5230e166@sandbox123.mailgun.org>');
  assert.equal(sendMimeEmailResponse.message, 'Queued. Thank you.');
});

When('I send a request to retrieve a stored email', async () => {
  getEmailResponse = await emailsApi.getStoredEmail(domainName, 'storageKey');
});

Then('the getEmail response contains the email details', () => {
  assert.equal(getEmailResponse.from, 'sender@e2e.tst');
  assert.equal(getEmailResponse.subject, 'Hello from mailgun');
  assert.equal(getEmailResponse.recipients, 'recipient@e2e.tst');
  assert.equal(getEmailResponse.strippedHtml,
    '<h1>Hello %recipient.name%</h1><span style="color:blue">This is an HTML email</span>');
  assert.equal(getEmailResponse.strippedText, 'Message text only');
  assert.equal(getEmailResponse.strippedSignature, '');
  assert.equal(getEmailResponse.bodyHtml,
    '<h1>Hello %recipient.name%</h1><span style="color:blue">This is an HTML email</span>');
  assert.equal(getEmailResponse.bodyPlain, 'Message text only');
  const expectedMessageHeaders: Mailgun.MessageHeaders = {
    'Content-Type': 'multipart/alternative; boundary="44eea75a00c7df3bdd541c89727faec0ce8d5b09663245a35789d6b264c6"',
    'Message-Id': '<20240606162145.5f329edde3b4ed71@sandbox123.mailgun.org>',
    'Mime-Version': '1.0',
    'X-Mailgun-Deliver-By': new Date('Thu, 06 Jun 2024 07:40:00 +0000'),
    From: 'sender@e2e.tst',
    Subject: 'Hello from mailgun',
    To: '%recipient%',
  };
  assert.deepEqual(getEmailResponse.messageHeaders, expectedMessageHeaders);
});

When('I send a request to get the sending queue status', async () => {
  sendingQueuesStatusResponse = await emailsApi.getSendingQueuesStatus(domainName);
});

Then('the response contains the sending queues status', () => {
  assert.equal(sendingQueuesStatusResponse.regular.isDisabled, false);
  assert.equal(sendingQueuesStatusResponse.regular.disabled?.until, '');
  assert.equal(sendingQueuesStatusResponse.regular.disabled?.reason, '');
  assert.equal(sendingQueuesStatusResponse.scheduled.isDisabled, false);
  assert.equal(sendingQueuesStatusResponse.scheduled.disabled?.until, '');
  assert.equal(sendingQueuesStatusResponse.scheduled.disabled?.reason, '');
});

When('I send a request to purge a sending queue', async () => {
  purgeSendingQueueResponse = await emailsApi.purgeSendingQueue(domainName, 'http://localhost:3021');
});

Then('the response indicates the purge has been done', () => {
  assert.deepEqual(purgeSendingQueueResponse, {} );
});
