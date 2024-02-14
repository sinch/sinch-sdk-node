import { V1Template, V1ListTemplatesResponse } from '../../../models';
import { TemplatesV1Api, CreateTemplateRequestData, DeleteTemplateRequestData, GetTemplateRequestData, ListTemplatesRequestData, UpdateTemplateRequestData } from './templates-v1-api';

export class TemplatesV1ApiFixture implements Partial<Readonly<TemplatesV1Api>> {

  /**
   * Fixture associated to function create
   */
  public create: jest.Mock<Promise<V1Template>, [CreateTemplateRequestData]> = jest.fn();
  /**
   * Fixture associated to function delete
   */
  public delete: jest.Mock<Promise<any>, [DeleteTemplateRequestData]> = jest.fn();
  /**
   * Fixture associated to function get
   */
  public get: jest.Mock<Promise<V1Template>, [GetTemplateRequestData]> = jest.fn();
  /**
   * Fixture associated to function list
   */
  public list: jest.Mock<Promise<V1ListTemplatesResponse>, [ListTemplatesRequestData]> = jest.fn();
  /**
   * Fixture associated to function update
   */
  public update: jest.Mock<Promise<V1Template>, [UpdateTemplateRequestData]> = jest.fn();
}

