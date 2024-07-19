import { Conversation, ConversationService, SupportedConversationRegion, TemplatesV2Api } from '../../../../src';
import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';

let templatesV2Api: TemplatesV2Api;
let template: Conversation.V2Template;
let templatesList: Conversation.V2ListTemplatesResponse;
let translationsList: Conversation.V2ListTranslationsResponse;
let deleteTemplateResponse: void;
let currentVersion: number;

Given('the Conversation service "TemplatesV2" is available', function () {
  const conversationService = new ConversationService({
    projectId: 'tinyfrog-jump-high-over-lilypadbasin',
    keyId: 'keyId',
    keySecret: 'keySecret',
    authHostname: 'http://localhost:3011',
    conversationTemplatesHostname: 'http://localhost:3015',
    conversationRegion: SupportedConversationRegion.UNITED_STATES,
  });
  templatesV2Api = conversationService.templatesV2;
});

When('I send a request to create a conversation template with the V2 API', async () => {
  template = await templatesV2Api.create({
    createTemplateRequestBody: {
      id: '01HVN010MG3B9N6X323JAFN59P',
      default_translation: 'en-US',
      description: 'Text template V2',
      translations: [
        {
          language_code: 'en-US',
          version: '3',
          text_message: {
            text: 'Hello ${name}. Text message template created with V2 API',
          },
          variables: [
            {
              key: 'name',
              preview_value: 'Professor Jones',
            },
          ],
        },
      ],
    },
  });
});

Then('the conversation template V2 is created', () => {
  assert.equal(template.id, '01HVN010MG3B9N6X323JAFN59P');
  assert.equal(template.version, 1);
  assert.equal(template.translations?.length, 1);
  assert.equal(template.translations?.[0].version, '3');
});

When('I send a request to list the conversation templates with the V2 API', async () => {
  templatesList = await templatesV2Api.list({});
});

Then('the response contains the list of conversation templates with the V2 structure', () => {
  assert.equal(templatesList.templates?.length, 2);
  for(const templateV2 of templatesList.templates!) {
    assert.ok(templateV2.version);
    let latestVersionCount = 0;
    let otherVersionCount = 0;
    const translations = templateV2.translations!;
    for(const translation of translations) {
      translation.version === 'latest' ? latestVersionCount++ : otherVersionCount++;
    }
    assert.equal(latestVersionCount, otherVersionCount);
  }
});

When('I send a request to list the translations for a template with the V2 API', async () => {
  translationsList = await templatesV2Api.listTranslations({
    template_id: '01W4FFL35P4NC4K35TEMPLATEV2',
  });
});

Then('the response contains the list of translations for a template with the V2 structure', () => {
  assert.ok(translationsList.translations);
  assert.equal(translationsList.translations.length, 2);
  assert.equal(translationsList.translations.find((translation) => translation.version === 'latest'), undefined);
});

When('I send a request to retrieve a conversation template with the V2 API', async () => {
  template = await templatesV2Api.get({
    template_id: '01HVN010MG3B9N6X323JAFN59P',
  });
});

Then('the response contains the conversation template details with the V2 structure', () => {
  assert.equal(template.id, '01HVN010MG3B9N6X323JAFN59P');
  assert.equal(template.description, 'Text template V2');
  assert.equal(template.version, 1);
  assert.equal(template.translations?.length, 2);
  const translation = template.translations!.find((translation) => translation.version !== 'latest');
  assert.ok(translation);
  assert.equal(translation.language_code, 'en-US');
  assert.equal(translation.version, '3');
  assert.deepEqual(translation.create_time, new Date('2024-06-06T14:42:42Z'));
  assert.deepEqual(translation.update_time, new Date('2024-06-06T14:42:42Z'));
  assert.equal(translation.variables?.length, 1);
  assert.ok(translation.text_message?.text);
  assert.deepEqual(translation.channel_template_overrides, {});
  assert.equal(template.default_translation, 'en-US');
  assert.deepEqual(template.create_time, new Date('2024-06-06T14:42:42Z'));
  assert.deepEqual(template.update_time, new Date('2024-06-06T14:42:42Z'));
});

When('I send a request to update a conversation template with the V2 API', async () => {
  currentVersion = 1;
  template = await templatesV2Api.update({
    template_id: '01HVN010MG3B9N6X323JAFN59P',
    updateTemplateRequestBody: {
      description: 'Updated description v2',
      version: currentVersion,
      default_translation: 'en-US',
      translations: [
        {
          language_code: 'en-US',
          version: '1',
          list_message: {
            title: 'Choose your icecream flavor',
            description: 'The best icecream in town!',
            sections: [
              {
                title: 'Fruit flavors',
                items: [
                  {
                    choice: {
                      title: 'Strawberry',
                      postback_data: 'Strawberry postback',
                    },
                  },
                  {
                    choice: {
                      title: 'Blueberry',
                      postback_data: 'Blueberry postback',
                    },
                  },
                ],
              },
              {
                title: 'Other flavors',
                items: [
                  {
                    choice: {
                      title: 'Chocolate',
                      postback_data: 'Chocolate postback',
                    },
                  },
                  {
                    choice: {
                      title: 'Vanilla',
                      postback_data: 'Vanilla postback',
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  });
});

Then('the response contains the conversation template details with updated data with the V2 structure', () => {
  assert.equal(template.id, '01HVN010MG3B9N6X323JAFN59P');
  assert.equal(template.description, 'Updated description v2');
  assert.equal(template.version, currentVersion + 1);
  assert.equal(template.translations?.length, 1);
  assert.equal(template.default_translation, 'en-US');
  assert.deepEqual(template.create_time, new Date('2024-06-06T14:42:42Z'));
  assert.deepEqual(template.update_time, new Date('2024-06-06T15:45:45Z'));
  const translation = template.translations?.[0];
  assert.ok(translation?.list_message);
});

When('I send a request to delete a conversation template with the V2 API', async () => {
  deleteTemplateResponse = await templatesV2Api.delete({
    template_id: '01W4FFL35P4NC4K35TEMPLATEV2',
  });
});

Then('the delete conversation template response V2 contains no data', () => {
  assert.deepEqual(deleteTemplateResponse, {} );
});
