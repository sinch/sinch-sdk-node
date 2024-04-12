import { CallbackConfigurationUpdate } from '../../callback-configuration-update';

export interface GetCallbackConfigurationRequestData {}
export interface UpdateCallbackConfigurationRequestData {
  /** The callback configuration details to be updated. */
  updateCallbackConfigurationRequestBody?: CallbackConfigurationUpdate;
}
