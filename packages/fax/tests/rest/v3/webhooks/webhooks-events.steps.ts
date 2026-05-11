import { Given, Then, When } from '@cucumber/cucumber';

Given('the Fax Webhooks handler is available', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
When('I send a request to trigger the INCOMING_FAX event with the "{}" content type', async (_contentType) => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the event describes an INCOMING_FAX event with the application-json content type', () => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the event describes an INCOMING_FAX event with the multipart-formdata content type', () => {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});
