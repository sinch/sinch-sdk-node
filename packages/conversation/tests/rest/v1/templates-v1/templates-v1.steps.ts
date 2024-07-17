import { Conversation, ConversationService, SupportedConversationRegion, TemplatesV1Api } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';

let templatesV1Api: TemplatesV1Api;
let template: Conversation.V1Template;
let templatesList: Conversation.V1ListTemplatesResponse;
let deleteTemplateResponse: void;

const enUSTranslation: Conversation.V1TemplateTranslation = {
  language_code: 'en-US',
  variables: [
    {
      key: 'name',
      preview_value: 'Professor Jones',
    },
  ],
  content: '{"text_message":{"text":"Hello ${name}. Text message template created with V1 API"}}',
};

const frFRTranslation: Conversation.V1TemplateTranslation = {
  language_code: 'fr-FR',
  variables: [
    {
      key: 'name',
      preview_value: 'Professeur Jones',
    },
  ],
  content: '{"text_message":{"text":"Bonjour ${name}. Ce message texte provient d\'un template V1"}}',
};

Given('the Conversation service "TemplatesV1" is available', function () {
  const conversationService = new ConversationService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    conversationTemplatesHostname: 'http://localhost:3015',
    conversationRegion: SupportedConversationRegion.UNITED_STATES,
  });
  templatesV1Api = conversationService.templatesV1;
});

When('I send a request to create a conversation template with the V1 API', async () => {
  template = await templatesV1Api.create({
    createTemplateRequestBody: {
      default_translation: 'en-US',
      channel: 'MESSENGER',
      description: 'Text template V1',
      translations: [
        {
          ...enUSTranslation,
          version: '1',
        },
      ],
    },
  });
});

Then('the conversation template V1 is created', () => {
  assert.equal(template.id, '01W4FFL35P4NC4K35TEMPLATE01');
});

When('I send a request to list the conversation templates with the V1 API', async () => {
  templatesList = await templatesV1Api.list({});
});

Then('the response contains the list of conversation templates with the V1 structure', () => {
  assert.equal(templatesList.templates?.length, 2);
});

When('I send a request to retrieve a conversation template with the V1 API', async () => {
  template = await templatesV1Api.get({
    template_id: '01W4FFL35P4NC4K35TEMPLATE01',
  });
});

Then('the response contains the conversation template details with the V1 structure', () => {
  assert.equal(template.id, '01W4FFL35P4NC4K35TEMPLATE01');
  assert.equal(template.description, 'Text template V1');
  assert.equal(template.translations?.length, 1);
  const expectedTranslation: Conversation.V1TemplateTranslation = {
    language_code: 'en-US',
    content: '{"text_message":{"text":"Hello ${name}. Text message template created with V1 API"}}',
    version: '1',
    create_time: new Date('2024-06-06T14:42:42Z'),
    update_time: new Date('2024-06-06T14:42:42Z'),
    variables: [
      {
        key: 'name',
        preview_value: 'Professor Jones',
      },
    ],
  };
  assert.deepEqual(template.translations?.[0], expectedTranslation);
  assert.equal(template.default_translation, 'en-US');
  assert.deepEqual(template.create_time, new Date('2024-06-06T14:42:42Z'));
  assert.deepEqual(template.update_time, new Date('2024-06-06T14:42:42Z'));
  assert.equal(template.channel, 'UNSPECIFIED');
});

When('I send a request to update a conversation template with the V1 API', async () => {
  template = await templatesV1Api.update({
    template_id: '01W4FFL35P4NC4K35TEMPLATE01',
    updateTemplateRequestBody: {
      description: 'Updated text template V1',
      channel: 'SMS',
      default_translation: 'fr-FR',
      translations: [
        {
          ...enUSTranslation,
          content: '{"text_message":{"text":"Hello ${name}. This text message template has been created with V1 API"}}',
          version: '2',
        },
        {
          ...frFRTranslation,
          version: '1',
        },
      ],
    },
  });
});

Then('the response contains the conversation template details with updated data with the V1 structure', () => {
  assert.equal(template.id, '01W4FFL35P4NC4K35TEMPLATE01');
  assert.equal(template.description, 'Updated text template V1');
  assert.equal(template.translations?.length, 2);
  const expectedenUSTranslation: Conversation.V1TemplateTranslation = {
    language_code: 'en-US',
    content: '{"text_message":{"text":"Hello ${name}. This text message template has been created with V1 API"}}',
    version: '2',
    create_time: new Date('2024-06-06T14:45:45Z'),
    update_time: new Date('2024-06-06T14:45:45Z'),
    variables: [
      {
        key: 'name',
        preview_value: 'Professor Jones',
      },
    ],
  };
  assert.deepEqual(template.translations?.[1], expectedenUSTranslation);
  const expectedfrFRTranslation: Conversation.V1TemplateTranslation = {
    language_code: 'fr-FR',
    content: '{"text_message":{"text":"Bonjour ${name}. Ce message texte provient d\'un template V1"}}',
    version: '1',
    create_time: new Date('2024-06-06T14:45:45Z'),
    update_time: new Date('2024-06-06T14:45:45Z'),
    variables: [
      {
        key: 'name',
        preview_value: 'Professeur Jones',
      },
    ],
  };
  assert.deepEqual(template.translations?.[0], expectedfrFRTranslation);
  assert.equal(template.default_translation, 'fr-FR');
  assert.deepEqual(template.create_time, new Date('2024-06-06T14:42:42Z'));
  assert.deepEqual(template.update_time, new Date('2024-06-06T14:45:45Z'));
  assert.equal(template.channel, 'UNSPECIFIED');
});

When('I send a request to delete a conversation template with the V1 API', async () => {
  deleteTemplateResponse = await templatesV1Api.delete({
    template_id: '01W4FFL35P4NC4K35TEMPLATE01',
  });
});

Then('the delete conversation template response V1 contains no data', () => {
  assert.deepEqual(deleteTemplateResponse, {} );
});
