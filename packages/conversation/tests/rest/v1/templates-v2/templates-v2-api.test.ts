import { SinchClientParameters } from '@sinch/sdk-client';
import {
  TemplatesV2Api,
  TemplatesV2ApiFixture,
  Conversation,
} from '../../../../src';

describe('TemplatesV2Api', () => {
  let templatesV2Api: TemplatesV2Api;
  let fixture: TemplatesV2ApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new TemplatesV2ApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    templatesV2Api = new TemplatesV2Api(credentials);
  });


  describe ('v2CreateTemplate', () => {
    it('should make a POST request to create a template V1', async () => {
      // Given
      const requestData: Conversation.V2CreateTemplateRequestData = {
        createTemplateRequestBody: {
          description: 'Template v2 description',
          default_translation: 'en-US',
          translations: [
            {
              language_code: 'en-US',
              version: '1',
              location_message: {
                title: 'title',
                coordinates: {
                  latitude: 0,
                  longitude: 0,
                },
                label: 'label',
              },
            },
          ],
        },
      };
      const expectedResponse: Conversation.V2TemplateResponse = {
        id: 'templateV2Id',
        description: 'Template v2 description',
        version: 1,
        translations: [
          {
            language_code: 'en-US',
            version: '1',
            create_time: new Date('2024-02-07T15:25:42Z'),
            update_time: new Date('2024-02-07T15:25:42Z'),
            location_message: {
              title: 'title',
              coordinates: {
                latitude: 0,
                longitude: 0,
              },
              label: 'label',
            },
            channel_template_overrides: {},
          },
        ],
        default_translation: 'en-US',
        create_time: new Date('2024-02-07T15:25:42Z'),
        update_time: new Date('2024-02-07T15:25:42Z'),
      };

      // When
      fixture.create.mockResolvedValue(expectedResponse);
      templatesV2Api.create = fixture.create;
      const response = await templatesV2Api.create(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.create).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('v2DeleteTemplate', () => {
    it('should make a DELETE request to delete the template associated to the ID', async () => {
      // Given
      const requestData: Conversation.V2DeleteTemplateRequestData = {
        template_id: 'templateV2Id',
      };
      const expectedResponse: any = {};

      // When
      fixture.delete.mockResolvedValue(expectedResponse);
      templatesV2Api.delete = fixture.delete;
      const response = await templatesV2Api.delete(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('v2GetTemplate', () => {
    it('should make a GET request to get the template associated to the ID', async () => {
      // Given
      const requestData: Conversation.V2GetTemplateRequestData = {
        template_id: 'templateV2Id',
      };
      const expectedResponse: Conversation.V2TemplateResponse = {
        id: 'templateV2Id',
        description: 'Template v2 description',
        version: 1,
        translations: [
          {
            language_code: 'en-US',
            version: '1',
            create_time: new Date('2024-02-07T15:25:42Z'),
            update_time: new Date('2024-02-07T15:25:42Z'),
            location_message: {
              title: 'title',
              coordinates: {
                latitude: 0,
                longitude: 0,
              },
              label: 'label',
            },
            channel_template_overrides: {},
          },
        ],
        default_translation: 'en-US',
        create_time: new Date('2024-02-07T15:25:42Z'),
        update_time: new Date('2024-02-07T15:25:42Z'),
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      templatesV2Api.get = fixture.get;
      const response = await templatesV2Api.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('v2ListTemplates', () => {
    it('should make a GET request to list the templates belonging to the project ID', async () => {
      // Given
      const requestData: Conversation.V2ListTemplatesRequestData = {};
      const expectedResponse: Conversation.V2ListTemplatesResponse = {
        templates: [
          {
            id: 'templateV2Id',
            description: 'Template v2 description',
            version: 1,
            translations: [
              {
                language_code: 'en-US',
                version: '1',
                create_time: new Date('2024-02-07T15:25:42Z'),
                update_time: new Date('2024-02-07T15:25:42Z'),
                location_message: {
                  title: 'title',
                  coordinates: {
                    latitude: 0,
                    longitude: 0,
                  },
                  label: 'label',
                },
                channel_template_overrides: {},
              },
            ],
            default_translation: 'en-US',
            create_time: new Date('2024-02-07T15:25:42Z'),
            update_time: new Date('2024-02-07T15:25:42Z'),
          },
        ],
      };

      // When
      fixture.list.mockResolvedValue(expectedResponse);
      templatesV2Api.list = fixture.list;
      const response = await templatesV2Api.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('v2ListTranslations', () => {
    // eslint-disable-next-line max-len
    it('should make a GET request to list the translations belonging to the template associated to the ID', async () => {
      // Given
      const requestData: Conversation.V2ListTranslationsRequestData = {
        template_id: 'templateV2Id',
        language_code: 'en-US',
        translation_version: 'latest',
      };
      const expectedResponse: Conversation.V2ListTranslationsResponse = {
        translations: [
          {
            language_code: 'en-US',
            version: 'latest',
            create_time: new Date('2024-02-07T15:25:42Z'),
            update_time: new Date('2024-02-07T15:25:42Z'),
            location_message: {
              title: 'title',
              coordinates: {
                latitude: 0,
                longitude: 0,
              },
              label: 'label',
            },
            channel_template_overrides: {},
          },
        ],
      };

      // When
      fixture.listTranslations.mockResolvedValue(expectedResponse);
      templatesV2Api.listTranslations = fixture.listTranslations;
      const response = await templatesV2Api.listTranslations(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.listTranslations).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('v2UpdateTemplate', () => {
    it('should make a PUT request to  update the template associated to the ID', async () => {
      // Given
      const requestData: Conversation.V2UpdateTemplateRequestData = {
        template_id: 'templateV2Id',
        updateTemplateRequestBody: {
          version: 1,
          description: 'Updated description v2',
          default_translation: 'fr-FR',
          translations: [
            {
              language_code: 'fr-FR',
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
              version: '4',
            },
          ],
        },
      };
      const expectedResponse: Conversation.V2TemplateResponse = {
        id: 'templateV2Id',
        description: 'Updated description v2',
        version: 2,
        translations: [
          {
            language_code: 'fr-FR',
            version: '4',
            create_time: new Date('2024-02-07T17:33:56Z'),
            update_time: new Date('2024-02-07T17:33:56Z'),
            variables: [],
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
            channel_template_overrides: {},
          },
        ],
        default_translation: 'fr-FR',
        create_time: new Date('2024-02-07T15:25:42Z'),
        update_time: new Date('2024-02-07T17:33:56Z'),
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      templatesV2Api.update = fixture.update;
      const response = await templatesV2Api.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
