import { TemplateReference } from '../template-reference';

export interface ChannelTemplateReference {

  /** @see TemplateReference */
  template_reference?: TemplateReference;
  /** A mapping between omni-template variables and the channel specific parameters. */
  parameter_mappings?: { [key: string]: string; };
}
