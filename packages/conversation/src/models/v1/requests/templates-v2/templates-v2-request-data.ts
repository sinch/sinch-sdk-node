import { V2Template } from '../../v2-template';

export interface V2CreateTemplateRequestData {
  /** Required. The template to create. */
  'createTemplateRequestBody': Omit<V2Template, 'create_time' | 'update_time'>;
}
export interface V2DeleteTemplateRequestData {
  /** Required. The ID of the template to delete. */
  'template_id': string;
}
export interface V2GetTemplateRequestData {
  /** Required. The ID of the template to fetch. */
  'template_id': string;
}
export interface V2ListTemplatesRequestData {
}
export interface V2ListTranslationsRequestData {
  /** Required. The template ID. */
  'template_id': string;
  /** Optional. The translation's language code. */
  'language_code'?: string;
  /** Optional. The translation's version. */
  'translation_version'?: string;
}
export interface V2UpdateTemplateRequestData {
  /** The id of the template to be updated. Specified or automatically generated during template creation. Unique per project. */
  'template_id': string;
  /** Required. The updated template. */
  'updateTemplateRequestBody': Omit<V2Template, 'id' | 'create_time' | 'update_time'>;
}
