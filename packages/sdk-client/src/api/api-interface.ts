import { ApiClient } from './api-client';

/** API interface */
export interface Api {
  /** API name */
  apiName: string;
  /** API Client used to process the calls to the API */
  client?: ApiClient;
}
