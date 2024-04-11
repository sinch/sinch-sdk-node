import { V1Template } from '../../v1-template';

export interface CreateTemplateRequestData {
  /** Required. The template to create. */
  'createTemplateRequestBody': V1Template;
}
export interface DeleteTemplateRequestData {
  /** Required. The ID of the template to fetch. */
  'template_id': string;
}
export interface GetTemplateRequestData {
  /** Required. The ID of the template to fetch. */
  'template_id': string;
}
export interface ListTemplatesRequestData {
}
export interface UpdateTemplateRequestData {
  /** The id of the template to be updated. Specified or automatically generated during template creation. Unique per project. */
  'template_id': string;
  /** Required. The updated template. */
  'updateTemplateRequestBody': V1Template;
  /** The set of field mask paths. */
  'update_mask'?: Array<string>;
}
