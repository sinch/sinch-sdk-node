import FormData = require('form-data');
import { YesNoEnum } from '../enum';

export interface TemplateProperties {
  /** Pass `yes` if you want to have a rendered template in the text part of the message in case of template sending */
  text?: YesNoEnum;
  /** Render a specific version of the given template instead of the latest version. `o:template` option must also be provided. */
  version?: string;
  /** A valid JSON-encoded dictionary used as the input for template variable expansion.  See **Templates** for more information */
  variables?: string;
}

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
