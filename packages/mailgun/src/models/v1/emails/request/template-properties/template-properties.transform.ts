import { TemplateProperties } from './template-properties';
import FormData = require('form-data');

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const appendTemplatePropertiesToFormData = (sdkRequest: TemplateProperties, formData: FormData): FormData => {
  if (sdkRequest['text'] != null) {
    formData.append('t:text', String(sdkRequest['text']));
  }
  if (sdkRequest['version'] != null) {
    formData.append('t:version', sdkRequest['version']);
  }
  if (sdkRequest['variables'] != null) {
    formData.append('t:variables', JSON.stringify(sdkRequest['variables']));
  }
  return formData;
};
