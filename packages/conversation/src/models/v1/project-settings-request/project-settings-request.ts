import { ContactSettings } from '../contact-settings';

export interface ProjectSettingsContent {
  /** @see ContactSettings */
  contact_settings?: ContactSettings;
}

/**
 * Request body for creating or updating project settings.
 */
export interface ProjectSettingsRequest extends ProjectSettingsContent{}
