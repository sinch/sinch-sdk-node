import { YesNoEnum } from '../enum';

export interface TemplateProperties {
  /** Pass `yes` if you want to have a rendered template in the text part of the message in case of template sending */
  text?: YesNoEnum;
  /** Render a specific version of the given template instead of the latest version. `o:template` option must also be provided. */
  version?: string;
  /** A valid JSON-encoded dictionary used as the input for template variable expansion.  See **Templates** for more information */
  variables?: string;
}

