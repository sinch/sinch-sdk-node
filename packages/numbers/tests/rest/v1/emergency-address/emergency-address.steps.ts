import { Given, Then, When } from '@cucumber/cucumber';
import assert from 'assert';


// TODO: change the text as the numbers service should not have knowledge of subdomains being available or not
Given('the Numbers service is available to handle emergency addresses', function() {
});

When('I send a request to validate an emergency address', async () => {
  // TODO
  assert.ok(true);
});

Then('the response contains the corrected address', () => {
  // TODO
  assert.ok(true);
});

When('I send a request to validate an approximate emergency address', async () => {
  // TODO
  assert.ok(true);
});

Then('the response contains the candidate address', () => {
  // TODO
  assert.ok(true);
});

When('I send a request to provision an emergency address', async () => {
  // TODO
  assert.ok(true);
});

Then('the response contains the provisioned emergency address', () => {
  // TODO
  assert.ok(true);
});

When('I send a request to deprovision an emergency address', async () => {
  // TODO
  assert.ok(true);
});

Then('the response indicates successful deprovisioning', () => {
  // TODO
  assert.ok(true);
});

When('I send a request to get the emergency address for a number', async () => {
  // TODO
  assert.ok(true);
});

Then('the response contains the provisioned emergency address for the phone number', () => {
  // TODO
  assert.ok(true);
});
