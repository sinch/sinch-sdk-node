import { ProjectSettingsContent, ProjectSettingsRequest } from '../../../src/models';
import { contactSettings } from './contact-settings';

export const projectSettingsRequest = {
  contact_settings: contactSettings,
} satisfies ProjectSettingsRequest;

export const projectSettingsContent = {
  contact_settings: contactSettings,
} satisfies ProjectSettingsContent;
