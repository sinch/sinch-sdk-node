import { SinchClientParameters } from '@sinch/sdk-client';
import {
  DeleteTemplateRequestData,
  GetTemplateRequestData,
  ListTemplatesRequestData,
  UpdateTemplateRequestData,
  V1ListTemplatesResponse,
  V1Template,
  TemplatesV1Api,
  TemplatesV1ApiFixture,
  CreateTemplateRequestData } from '../../../../src';

describe('TemplatesV1Api', () => {
  let templatesV1Api: TemplatesV1Api;
  let fixture: TemplatesV1ApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new TemplatesV1ApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    templatesV1Api = new TemplatesV1Api(credentials);
  });


  describe ('createTemplate', () => {
    it('should make a POST request to create a template V1', async () => {
      // Given
      const requestData: CreateTemplateRequestData = {
        createTemplateRequestBody: {
          description: 'Template description',
          default_translation: 'en-US',
          translations: [
            {
              language_code: 'en-US',
              version: '1',
              content: 'Hello ${name}',
              variables: [
                {
                  key: 'name',
                  preview_value: 'John',
                },
              ],
            },
          ],
        },
      };
      const expectedResponse: V1Template = {
        id: 'templateId',
        description: 'Template description',
        translations: [
          {
            language_code: 'en-US',
            content: 'Hello ${name}',
            version: '1',
            create_time: new Date('2024-02-07T15:25:42Z'),
            update_time: new Date('2024-02-07T15:25:42Z'),
            variables: [
              {
                key: 'name',
                preview_value: 'John',
              },
            ],
          },
        ],
        default_translation: 'en-US',
        create_time: new Date('2024-02-07T15:25:42Z'),
        update_time: new Date('2024-02-07T15:25:42Z'),
        channel: 'UNSPECIFIED',
      };

      // When
      fixture.create.mockResolvedValue(expectedResponse);
      templatesV1Api.create = fixture.create;
      const response = await templatesV1Api.create(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.create).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteTemplate', () => {
    it('should make a DELETE request to delete the template associated to the ID', async () => {
      // Given
      const requestData: DeleteTemplateRequestData = {
        template_id: 'templateId',
      };
      const expectedResponse: any = {};

      // When
      fixture.delete.mockResolvedValue(expectedResponse);
      templatesV1Api.delete = fixture.delete;
      const response = await templatesV1Api.delete(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getTemplate', () => {
    it('should make a GET request to get the template associated to the ID', async () => {
      // Given
      const requestData: GetTemplateRequestData = {
        template_id: 'templateId',
      };
      const expectedResponse: V1Template = {
        id: 'templateId',
        description: 'Template description',
        translations: [
          {
            language_code: 'en-US',
            content: 'Hello ${name}',
            version: '1',
            create_time: new Date('2024-02-07T15:25:42Z'),
            update_time: new Date('2024-02-07T15:25:42Z'),
            variables: [
              {
                key: 'name',
                preview_value: 'John',
              },
            ],
          },
        ],
        default_translation: 'en-US',
        create_time: new Date('2024-02-07T15:25:42Z'),
        update_time: new Date('2024-02-07T15:25:42Z'),
        channel: 'UNSPECIFIED',
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      templatesV1Api.get = fixture.get;
      const response = await templatesV1Api.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('listTemplates', () => {
    it('should make a GET request to list the templates belonging to the project ID', async () => {
      // Given
      const requestData: ListTemplatesRequestData = {};
      const expectedResponse: V1ListTemplatesResponse = {
        templates: [
          {
            id: 'templateId',
            description: 'Template description',
            translations: [
              {
                language_code: 'en-US',
                content: 'Hello ${name}',
                version: '1',
                create_time: new Date('2024-02-07T15:25:42Z'),
                update_time: new Date('2024-02-07T15:25:42Z'),
                variables: [
                  {
                    key: 'name',
                    preview_value: 'John',
                  },
                ],
              },
            ],
            default_translation: 'en-US',
            create_time: new Date('2024-02-07T15:25:42Z'),
            update_time: new Date('2024-02-07T15:25:42Z'),
            channel: 'UNSPECIFIED',
          },
        ],
      };

      // When
      fixture.list.mockResolvedValue(expectedResponse);
      templatesV1Api.list = fixture.list;
      const response = await templatesV1Api.list(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.list).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateTemplate', () => {
    it('should make a PATCH request to update the template associated to the ID', async () => {
      // Given
      const requestData: UpdateTemplateRequestData = {
        template_id: 'templateId',
        updateTemplateRequestBody: {
          description: 'Updated description',
          default_translation: 'fr-FR',
          translations: [
            {
              language_code: 'fr-FR',
              content: 'Bonjour ${name}',
              variables: [
                {
                  key: 'name',
                  preview_value: 'John',
                },
              ],
            },
          ],
        },
      };
      const expectedResponse: V1Template = {
        id: 'templateId',
        description: 'Updated description',
        // Note that the translation array is entirely replaced by the one sent in the request
        // If you want to preserve the previous translations, you need to send them again
        translations: [
          {
            language_code: 'fr-FR',
            content: 'Bonjour ${name}',
            version: '',
            create_time: new Date('2024-02-07T22:16:07Z'),
            update_time: new Date('2024-02-07T22:16:07Z'),
            variables: [
              {
                key: 'name',
                preview_value: 'John',
              },
            ],
          },
        ],
        default_translation: 'fr-FR',
        create_time: new Date('2024-02-07T15:25:42Z'),
        update_time: new Date('2024-02-07T22:16:07Z'),
        channel: 'UNSPECIFIED',
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      templatesV1Api.update = fixture.update;
      const response = await templatesV1Api.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
