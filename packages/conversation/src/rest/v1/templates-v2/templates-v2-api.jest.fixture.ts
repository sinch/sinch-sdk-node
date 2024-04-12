import { TemplatesV2Api } from './templates-v2-api';
import {
  V2ListTemplatesResponse,
  V2ListTranslationsResponse,
  V2TemplateResponse,
  V2CreateTemplateRequestData,
  V2DeleteTemplateRequestData,
  V2GetTemplateRequestData,
  V2ListTemplatesRequestData,
  V2ListTranslationsRequestData,
  V2UpdateTemplateRequestData,
} from '../../../models';

export class TemplatesV2ApiFixture implements Partial<Readonly<TemplatesV2Api>> {

  /**
   * Fixture associated to function create
   */
  public create: jest.Mock<Promise<V2TemplateResponse>, [V2CreateTemplateRequestData]> = jest.fn();
  /**
   * Fixture associated to function delete
   */
  public delete: jest.Mock<Promise<any>, [V2DeleteTemplateRequestData]> = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<V2TemplateResponse>, [V2GetTemplateRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<Promise<V2ListTemplatesResponse>, [V2ListTemplatesRequestData]> = jest.fn();
  /**
   * Fixture associated to function listTranslations
   */
  public listTranslations: jest.Mock<Promise<V2ListTranslationsResponse>, [V2ListTranslationsRequestData]> = jest.fn();
  /**
   * Fixture associated to function update
   */
  public update: jest.Mock<Promise<V2TemplateResponse>, [V2UpdateTemplateRequestData]> = jest.fn();
}
