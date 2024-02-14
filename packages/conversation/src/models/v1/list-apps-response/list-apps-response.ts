import { AppResponse } from '../app-response';

export interface ListAppsResponse {

  /** List of apps belonging to a specific project ID. */
  apps?: AppResponse[];
}
