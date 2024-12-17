import { TemplateProperties } from './template-properties';
import FormData = require('form-data');

// eslint-disable-next-line valid-jsdoc
/**
 * ** INTERNAL METHOD ** IT SHOULD NOT BE USED DIRECTLY BY SDK USERS AS IT CAN BE REMOVED OR MODIFIED WITHOUT NOTICE
 */
export const appendTemplatePropertiesToFormData = (templateProperties: TemplateProperties, formData: FormData) => {
  if (templateProperties['text'] != null) {
    formData.append('t:text', String(templateProperties['text']));
  }
  if (templateProperties['version'] != null) {
    formData.append('t:version', templateProperties['version']);
  }
  if (templateProperties['variables'] != null) {
    formData.append('t:variables', templateProperties['variables']);
  }
};
