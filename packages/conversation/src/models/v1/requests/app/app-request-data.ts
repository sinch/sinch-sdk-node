import { AppCreateRequest } from '../../app-create-request';
import { AppUpdateRequest } from '../../app-update-request';

export interface CreateAppRequestData {
  /** The app to create. */
  'appCreateRequestBody': AppCreateRequest;
}
export interface DeleteAppRequestData {
  /** The unique ID of the app. You can find this on the [Sinch Dashboard](https://dashboard.sinch.com/convapi/apps). */
  'app_id': string;
}
export interface GetAppRequestData {
  /** The unique ID of the app. You can find this on the [Sinch Dashboard](https://dashboard.sinch.com/convapi/apps). */
  'app_id': string;
}
export interface ListAppsRequestData {
}
export interface UpdateAppRequestData {
  /** The unique ID of the app. You can find this on the [Sinch Dashboard](https://dashboard.sinch.com/convapi/apps). */
  'app_id': string;
  /** The updated app. */
  'appUpdateRequestBody': AppUpdateRequest;
  /** The set of field mask paths. */
  'update_mask'?: Array<string>;
}
