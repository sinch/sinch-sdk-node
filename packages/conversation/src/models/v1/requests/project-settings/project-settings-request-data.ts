import { ProjectSettingsRequest } from '../../project-settings-request';

export interface CreateProjectSettingsRequestData {
  /** The project settings to create. */
  'createProjectSettingsRequestBody': ProjectSettingsRequest;
}

export interface DeleteProjectSettingsRequestData {
}

export interface GetProjectSettingsRequestData {
}

export interface UpdateProjectSettingsRequestData {
  /** The project settings to update. */
  'updateProjectSettingsRequestBody': ProjectSettingsRequest;
}
