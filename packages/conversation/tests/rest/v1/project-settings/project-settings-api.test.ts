import { SinchClientParameters } from '@sinch/sdk-client';
import { Conversation, ProjectSettingsApi, ProjectSettingsApiFixture } from '../../../../src';

describe('ProjectSettingsApi', () => {
  let projectSettingsApi: ProjectSettingsApi;
  let fixture: ProjectSettingsApiFixture;
  let credentials: SinchClientParameters;

  beforeEach(() => {
    fixture = new ProjectSettingsApiFixture();
    credentials = {
      projectId: 'PROJECT_ID',
      keyId: 'KEY_ID',
      keySecret: 'KEY_SECRET',
    };
    projectSettingsApi = new ProjectSettingsApi(credentials);
  });


  describe ('createSettings', () => {
    it('should make a POST request to create initial settings for the project', async () => {
      // Given
      const requestData: Conversation.CreateProjectSettingsRequestData = {
        createProjectSettingsRequestBody: {
          contact_settings: {
            unified_contact_id_enabled: true,
          },
        },
      };
      const expectedResponse: Conversation.ProjectSettings = {
        project_id: 'PROJECT_ID',
        settings: {
          contact_settings: {
            unified_contact_id_enabled: true,
          },
        },
      };

      // When
      fixture.create.mockResolvedValue(expectedResponse);
      projectSettingsApi.create = fixture.create;
      const response = await projectSettingsApi.create(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.create).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('deleteSettings', () => {
    it('should make a DELETE request to delete all project-level settings', async () => {
      // Given
      const requestData: Conversation.DeleteProjectSettingsRequestData = {};
      const expectedResponse: any = {};

      // When
      fixture.delete.mockResolvedValue(expectedResponse);
      projectSettingsApi.delete = fixture.delete;
      const response = await projectSettingsApi.delete(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.delete).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('getSettings', () => {
    it('should make a GET request to retrieve the current settings for the specified project', async () => {
      // Given
      const requestData: Conversation.GetProjectSettingsRequestData = {};
      const expectedResponse: Conversation.ProjectSettings = {
        project_id: 'PROJECT_ID',
        settings: {
          contact_settings: {
            unified_contact_id_enabled: true,
          },
        },
      };

      // When
      fixture.get.mockResolvedValue(expectedResponse);
      projectSettingsApi.get = fixture.get;
      const response = await projectSettingsApi.get(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.get).toHaveBeenCalledWith(requestData);
    });
  });

  describe ('updateSettings', () => {
    it('should make a PATCH request to update project setting', async () => {
      // Given
      const requestData: Conversation.UpdateProjectSettingsRequestData = {
        updateProjectSettingsRequestBody: {
          contact_settings: {
            unified_contact_id_enabled: false,
          },
        },
      };
      const expectedResponse: Conversation.ProjectSettings = {
        project_id: 'PROJECT_ID',
        settings: {
          contact_settings: {
            unified_contact_id_enabled: false,
          },
        },
      };

      // When
      fixture.update.mockResolvedValue(expectedResponse);
      projectSettingsApi.update = fixture.update;
      const response = await projectSettingsApi.update(requestData);

      // Then
      expect(response).toEqual(expectedResponse);
      expect(fixture.update).toHaveBeenCalledWith(requestData);
    });
  });
});
