import { ProjectSettingsContent } from '../project-settings-request';

/**
 * Project-level settings, including contact management options.
 */
export interface ProjectSettings {
  /** The unique ID of the project. */
  project_id?: string;
  /** The settings object containing contact settings. */
  settings?: ProjectSettingsContent;
}
