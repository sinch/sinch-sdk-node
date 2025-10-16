import {
  Conversation,
  ConversationService,
  ProjectSettingsApi,
  SupportedConversationRegion,
} from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';

let projectSettingsApi: ProjectSettingsApi;
let projectSettingsResponse: Conversation.ProjectSettings;
let deleteProjectSettingsResponse: void;

Given('the Conversation service "ProjectSettings" is available', function () {
  const conversationService = new ConversationService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    conversationHostname: 'http://localhost:3014',
    conversationRegion: SupportedConversationRegion.UNITED_STATES,
  });
  projectSettingsApi = conversationService.projectSettings;
});

When('I send a request to create project settings', async () => {
  projectSettingsResponse = await projectSettingsApi.create({
    createProjectSettingsRequestBody: {
      contact_settings: {
        unified_contact_id_enabled: false,
      },
    },
  });
});

Then('the project settings are created', () => {
  assert.equal(projectSettingsResponse.project_id, '123coffee-dada-beef-cafe-baadc0de5678');
  assert.equal(projectSettingsResponse.settings?.contact_settings?.unified_contact_id_enabled, false);
});

When('I send a request to retrieve project settings', async () => {
  projectSettingsResponse = await projectSettingsApi.get({});
});

Then('the response contains the project settings details', () => {
  assert.equal(projectSettingsResponse.project_id, '123coffee-dada-beef-cafe-baadc0de5678');
  assert.equal(projectSettingsResponse.settings?.contact_settings?.unified_contact_id_enabled, false);
});

When('I send a request to update project settings', async () => {
  projectSettingsResponse = await projectSettingsApi.update({
    updateProjectSettingsRequestBody: {
      contact_settings: {
        unified_contact_id_enabled: true,
      },
    },
  });
});

Then('the response contains the project settings details with updated properties', () => {
  assert.equal(projectSettingsResponse.project_id, '123coffee-dada-beef-cafe-baadc0de5678');
  assert.equal(projectSettingsResponse.settings?.contact_settings?.unified_contact_id_enabled, true);
});

When('I send a request to delete project settings', async () => {
  deleteProjectSettingsResponse = await projectSettingsApi.delete({});
});

Then('the delete project settings response contains no data', () => {
  assert.deepEqual(deleteProjectSettingsResponse, {} );
});
