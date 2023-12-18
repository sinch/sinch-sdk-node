import { RequestPlugin, ResponsePlugin } from '../plugins';

interface BaseApiClientOptions {
  /**
   * ID of the umbrella project containing the access keys
   * Found on your <a href=\"https://dashboard.sinch.com/settings/project-management\" target=\"_blank\">Sinch Customer Dashboard</a>.
   */
  projectId: string;

  /** Base path of the API server */
  basePath: string;

  /**
   * List of plugins to apply to the request before calling the API
   * @default [new Oauth2RequestPlugin()]
   */
  requestPlugins: RequestPlugin[];

  /**
   * List of plugins to apply to the response of the API call
   * @default [new ExceptionResponse()]
   */
  responsePlugins: ResponsePlugin<any>[];

  /** Some APIs have not been migrated fully to the 'projectId' structure and use another URL for their authentication
   *  This flag indicates the API is not using the 'projectId'
   *  @default false
   */
  useServicePlanId?: boolean;
}

export interface ApiClientOptions extends Partial<BaseApiClientOptions> {}
