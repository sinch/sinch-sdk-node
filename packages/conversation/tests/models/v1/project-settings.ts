import { ProjectSettings } from '../../../src/models';
import { projectSettingsContent } from './project-settings-request';

export const projectSettings = {
  project_id: 'project_1234567890',
  settings: projectSettingsContent,
} satisfies ProjectSettings;
