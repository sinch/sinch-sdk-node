import {
  CreateProjectSettingsRequestData,
  DeleteProjectSettingsRequestData,
  GetProjectSettingsRequestData,
  UpdateProjectSettingsRequestData,
} from '../../../../src/models';
import { projectSettingsRequest } from '../project-settings-request';

export const createProjectSettingsRequestData = {
  createProjectSettingsRequestBody: projectSettingsRequest,
} satisfies CreateProjectSettingsRequestData;

export const deleteProjectSettingsRequestData = {} satisfies DeleteProjectSettingsRequestData;

export const getProjectSettingsRequestData = {} satisfies GetProjectSettingsRequestData;

export const updateProjectSettingsRequestData = {
  updateProjectSettingsRequestBody: projectSettingsRequest,
} satisfies UpdateProjectSettingsRequestData;
